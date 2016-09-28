import cx from 'classnames'
import highlight from 'highlight.js'
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'

import './App.css';

class Highlight extends Component {
  componentDidMount () {
    highlight.highlightBlock(findDOMNode(this.refs.code))
  }

  componentDidUpdate () {
    highlight.initHighlighting.called = false
    highlight.highlightBlock(findDOMNode(this.refs.code))
  }

  render () {
    const { children, className, language, style } = this.props

    return (
      <pre
        className={className}
        style={style}
      >
        <code
          className={language}
          ref='code'
        >
          {children}
        </code>
      </pre>
    )
  }
}

const defaultFiles = [{
    name: 'mydir',
    id: 1,
    type: 'dir',
    children: [
      {
        content: `Now this is a story all about how
My life got flipped-turned upside down
And I'd like to take a minute
Just sit right there
I'll tell you how I became the prince of a town called Bel-Air

In west Philadelphia born and raised
On the playground was where I spent most of my days
Chillin' out maxin' relaxin' all cool
And all shooting some b-ball outside of the school
When a couple of guys who were up to no good
Started making trouble in my neighborhood
I got in one little fight and my mom got scared
She said, "You're movin' with your auntie and uncle in Bel-Air."

I begged and pleaded with her day after day
But she packed my suitcase and sent me on my way
She gave me a kiss and then she gave me my ticket.
I put my Walkman on and said, "I might as well kick it."

First class, yo, this is bad
Drinking orange juice out of a champagne glass.
Is this what the people of Bel-Air living like?
Hmm, this might be alright.

But wait I hear they're prissy, bourgeois, all that
Is this the type of place that they just send this cool cat?
I don't think so
I'll see when I get there
I hope they're prepared for the prince of Bel-Air

Well, the plane landed and when I came out
There was a dude who looked like a cop standing there with my name out
I ain't trying to get arrested yet
I just got here
I sprang with the quickness like lightning, disappeared

I whistled for a cab and when it came near
The license plate said "Fresh" and it had dice in the mirror
If anything I could say that this cab was rare
But I thought, "Nah, forget it."
– "Yo, home to Bel-Air."

I pulled up to the house about 7 or 8
And I yelled to the cabbie, "Yo home smell ya later."
I looked at my kingdom
I was finally there
To sit on my throne as the Prince of Bel-Air
        `,
        name: 'FRESH.txt',
        id: 30,
        type: 'txt',
      },
      {
        content: `
def greet(name):
    """Return the passed \`name\` with a greeting a the beginning

    :param name: \`str\` name to greet
    """
    return "Hello {}".format(name)
`,
        name: 'hello.py',
        id: 4,
        type: 'py'
      },
      {
        content: `
import cx from 'classnames'
import highlight from 'highlight.js'
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'

const getSelectedFile = (files, selectedFileId) => {
  if (!files || !files.length) { return null }

  let selectedFile = null
  files.forEach(file => {
    if (selectedFile) { return }
    selectedFile = file.id === selectedFileId ? file
    : file.children ? getSelectedFile(file.children, selectedFileId)
    : null
  })
  return selectedFile
}

const getFirstFileId = (files) => {
  let selectedFileId = null
  files.forEach(file => {
    if (selectedFileId !== null) { return }
    selectedFileId = file.type !== 'dir' ? file.id
    : file.children ? getFirstFileId(file.children)
    : null
  })
  return selectedFileId
}

const SidebarFile = ({ onClick, id, name, selected, level=1 }) => {
  return <div
      className={
        cx(
          'file-structure-explorer-sidebar-item',
          'file-structure-explorer-sidebar-item__file',
          {
          'file-structure-explorer-sidebar-item__selected': selected,
          }
        )}
      onClick={() => onClick(id)}
      style={{ paddingLeft: 15 * level }}>
    {name}
  </div>
}

const SidebarDirectory = ({ children, name, level=1, ...props }) => {
  return <div>
    <div
        className={cx(
          'file-structure-explorer-sidebar-item',
          'file-structure-explorer-sidebar-item__dir')}
        style={{ paddingLeft: 15 * level }}>
      {name}
    </div>
    {children.map(file => <SidebarFileOrDirectory
        {...props}
        {...file}
        key={file.id}
        level={level + 1}/>)}
  </div>
}

const SidebarFileOrDirectory = ({ type, onClickSidebarFile, ...props }) => {
  return type ==='dir' ?
    <SidebarDirectory
        {...props}
        onClickSidebarFile={onClickSidebarFile} />
  : <SidebarFile
        {...props}
        onClick={onClickSidebarFile}
        selected={props.selectedId === props.id} />
}

const FileBuffer = ({ content, type }) => {
  return <Highlight
      className="file-structure-explorer-file-buffer"
      language={type}>
    {content}
  </Highlight>
}

const FileStructureExplorerViewer = ({ files, selectedFile, onClickSidebarFile }) => {
  return <div className="file-structure-explorer-viewer">
    <div className="file-structure-explorer-sidebar">
        {files.map(file => <SidebarFileOrDirectory
            {...file}
            key={file.id}
            onClickSidebarFile={onClickSidebarFile}
            selectedId={selectedFile.id} />)}
      </div>
      <FileBuffer {...selectedFile} />
  </div>
}

class FileStructureExplorer extends Component {
  constructor(props) {
    super(props)

    const files = props.files || defaultFiles

    this.state = {
      files: files,
      selectedFileId: getFirstFileId(files),
    }
  }

  setSelectedFileId = (id) => {
    this.setState({ selectedFileId: id })
  }

  render() {
    const { files, selectedFileId } = this.state
    const selectedFile = getSelectedFile(files, selectedFileId)

    console.log(this.state)
    return (
      <div className="file-structure-explorer">
        <div className="file-structure-explorer-topbar">
          {selectedFile.name}
        </div>
        <FileStructureExplorerViewer
            files={files}
            onClickSidebarFile={this.setSelectedFileId}
            selectedFile={selectedFile}
        />
      </div>
    );
  }
}

export default FileStructureExplorer;
    `,
        name: 'Highlight.jsx',
        id: 5,
        type: 'es6',
      }
    ]
  },
  {
    name: 'package.json',
    id: 12,
    type: 'json',
    content: `
{
  "name": "file-structure",
  "version": "0.0.1",
  "private": true,
  "devDependencies": {
    "react-scripts": "0.6.0"
  },
  "dependencies": {
    "classnames": "^2.2.5",
    "highlight.js": "^9.7.0",
    "react": "^15.3.2",
    "react-dom": "^15.3.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
`
  }
]

const getSelectedFile = (files, selectedFileId) => {
  if (!files || !files.length) { return null }

  let selectedFile = null
  files.forEach(file => {
    if (selectedFile) { return }
    selectedFile = file.id === selectedFileId ? file
    : file.children ? getSelectedFile(file.children, selectedFileId)
    : null
  })
  return selectedFile
}

const getFirstFileId = (files) => {
  let selectedFileId = null
  files.forEach(file => {
    if (selectedFileId !== null) { return }
    selectedFileId = file.type !== 'dir' ? file.id
    : file.children ? getFirstFileId(file.children)
    : null
  })
  return selectedFileId
}

const SidebarFile = ({ onClick, id, name, selected, level=1 }) => {
  return <div
      className={
        cx(
          'file-structure-explorer-sidebar-item',
          'file-structure-explorer-sidebar-item__file',
          {
          'file-structure-explorer-sidebar-item__selected': selected,
          }
        )}
      onClick={() => onClick(id)}
      style={{ paddingLeft: 15 * level }}>
    {name}
  </div>
}

const SidebarDirectory = ({ children, name, level=1, ...props }) => {
  return <div>
    <div
        className={cx(
          'file-structure-explorer-sidebar-item',
          'file-structure-explorer-sidebar-item__dir')}
        style={{ paddingLeft: 15 * level }}>
      {name}
    </div>
    {children.map(file => <SidebarFileOrDirectory
        {...props}
        {...file}
        key={file.id}
        level={level + 1}/>)}
  </div>
}

const SidebarFileOrDirectory = ({ type, onClickSidebarFile, ...props }) => {
  return type ==='dir' ?
    <SidebarDirectory
        {...props}
        onClickSidebarFile={onClickSidebarFile} />
  : <SidebarFile
        {...props}
        onClick={onClickSidebarFile}
        selected={props.selectedId === props.id} />
}

const FileBuffer = ({ content, type }) => {
  return <Highlight
      className="file-structure-explorer-file-buffer"
      language={type === 'txt' ? 'md' : type}>
    {content}
  </Highlight>
}

const FileStructureExplorerViewer = ({ files, selectedFile, onClickSidebarFile }) => {
  return <div className="file-structure-explorer-viewer">
    <div className="file-structure-explorer-sidebar">
        {files.map(file => <SidebarFileOrDirectory
            {...file}
            key={file.id}
            onClickSidebarFile={onClickSidebarFile}
            selectedId={selectedFile.id} />)}
      </div>
      <FileBuffer {...selectedFile} />
  </div>
}

class FileStructureExplorer extends Component {
  constructor(props) {
    super(props)

    const files = props.files || defaultFiles

    this.state = {
      files: files,
      selectedFileId: getFirstFileId(files),
    }
  }

  setSelectedFileId = (id) => {
    this.setState({ selectedFileId: id })
  }

  render() {
    const { files, selectedFileId } = this.state
    const selectedFile = getSelectedFile(files, selectedFileId)

    return (
      <div className="file-structure-explorer">
        <div className="file-structure-explorer-topbar">
          {selectedFile ? selectedFile.name : 'Unknown'}
        </div>
        <FileStructureExplorerViewer
            files={files}
            onClickSidebarFile={this.setSelectedFileId}
            selectedFile={selectedFile || {}}
        />
      </div>
    );
  }
}

export default FileStructureExplorer;
