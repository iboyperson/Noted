import React, { useState, useCallback, useContext, useEffect } from "react"
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TreeView, TreeItem } from '@material-ui/lab';
import { ExpandMore, ChevronRight, Description } from '@material-ui/icons'
import { NotebookProvider } from "../App";
import { Notebook } from "../../util/Notebook";
import { Note } from "../../util/Note";
import { Drawer } from "@material-ui/core";

const drawerWidth = '175px'
const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
  }),
)

type icon = { icon: JSX.Element } | {
  expandIcon: JSX.Element
  collapseIcon: JSX.Element
}

function renderTree(items: Array<string>, icon?: icon, isNotes?: boolean): Array<JSX.Element> {
  return items.map<JSX.Element>((item: string) => <TreeItem key={item}
    nodeId={`${isNotes ? "note-" : ""}${item}`}
    label={item} {...icon} />)
}

interface SidebarProps {
  setNote: (note: Note) => void
}

export const Sidebar = ({ setNote }: SidebarProps): JSX.Element => {
  // This component wont render if the context is null so we can safely cast it
  const notebook = useContext(NotebookProvider) as Notebook

  const getNotes = useCallback(() => renderTree(notebook.getNotes(), { icon: <Description /> }, true), [notebook])

  const [notes, setNotes] = useState<Array<JSX.Element>>(getNotes())

  useEffect(() => {
    setNotes(getNotes())
    notebook.addNotesHook('add', () => setNotes(getNotes()))
  }, [getNotes, notebook])

  const [selected, setSelected] = useState<Array<string>>([])

  const onSelect = useCallback((event: React.ChangeEvent<{}>, nodeIds: string[] | string) => {
    // As we dont have multiSelect enabled according to the API this will be a string
    // so we cast as the types dont represent this
    // See: https://material-ui.com/api/tree-view/
    const id = nodeIds as unknown as string

    if (id.startsWith('note-') && selected[0] !== id) {
      const noteName = id.split("-")[1]
      setNote(notebook.getNote(noteName))

      if (typeof nodeIds === 'string') {
        setSelected([nodeIds])
      } else {
        setSelected(nodeIds)
      }
    }
  }, [notebook, selected, setNote])

  const classes = useStyles()

  // TODO: Add tags tree
  return (
    <Drawer variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        selected={selected}
        onNodeSelect={onSelect}
      >
        <TreeItem nodeId="notes" label="Notes">
          {notes}
        </TreeItem>
        {/* <TreeItem nodeId="tags" label="Tags">
          </TreeItem> */}
      </TreeView>
    </Drawer>
  )
}
