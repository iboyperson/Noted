import React, { useState } from 'react'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'

import './Tree.css'

export interface TreeNode {
    id: string
    name: string
    children?: Array<TreeNode>
}

interface TreeProps {
    nodes: TreeNode
    hasChildrenExpandIcon?: JSX.Element
    hasChildrenCollapseIcon?: JSX.Element
    noChildrenIcon?: JSX.Element
}

function getNodeId(node: TreeNode): string {
    return node.children ? `container-${node.id}` : `item-${node.id}`

}

function renderTree(props: TreeProps, childNode?: TreeNode) {
    const node = childNode ? childNode : props.nodes
    const id = getNodeId(node)

    const isRoot = node.id === "root"
    let icons = null
    if (!isRoot) {
      if (node.children) {
        icons = {
          expandIcon: props.hasChildrenExpandIcon,
          collapseIcon: props.hasChildrenCollapseIcon
        }
      } else {
        icons = {
          icon: props.noChildrenIcon
        }
      }
    }

    return (
        <TreeItem key={id} nodeId={id} label={node.name} {...icons}>
            {Array.isArray(node.children) ? node.children.map((childNode) => renderTree(props, childNode)) : null}
        </TreeItem>
    )
}

export const Tree = (props: TreeProps): JSX.Element => {
    const [expanded, setExpanded] = useState<Array<string>>([])
    const [selected, setSelected] = useState<Array<string>>([])

    const handleToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        setExpanded(nodeIds)
    }

    const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        // When there is only one selcted we get passed a string for some reason
        const id = typeof nodeIds === 'string' ? nodeIds : nodeIds[0]
        if (id.startsWith('item-')) {
            console.log("Hurrah")
        }
        setSelected(nodeIds)
    }

    return (
        <div className="Tree">
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                {renderTree(props)}
            </TreeView>
        </div>

    )
}
