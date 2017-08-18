import React from 'react';
import Types from 'prop-types';
import FullScreenButton from '../SlateEditor/plugins/slate-fullscreen-plugin/FullScreenButton';
import schema from './slate/schema';
import shortcuts from './slate/shortcuts';
import './PlainMarkdownInput.less';

import {
  AutocompletePlugin,
  ObjectReferenceButton
} from '../SlateEditor/plugins';

import {
  BoldButton,
  HeaderFiveButton,
  HeaderFourButton,
  HeaderOneButton,
  HeaderSixButton,
  HeaderThreeButton,
  HeaderTwoButton,
  ItalicButton,
  LinkButton,
  OrderedListButton,
  StrikethroughButton,
  UnorderedListButton
} from './buttons';

import { SlateContent, SlateEditor, SlateToolbar, SlateToolbarGroup } from '../SlateEditor';
import { Plain, Raw } from '@opuscapita/slate';

function deserialize(string, options = {}) {
  let raw =  {
    kind: 'state',
    document: {
      kind: 'document',
      nodes: [{
        kind: 'block',
        type: 'multiline',
        nodes: [
          {
            kind: 'text',
            ranges: [
              {
                text: string,
                marks: [],
              }
            ]
          }
        ]
      }]
    }
  };
  return Raw.deserialize(raw);
}

class PlainMarkdownInput extends React.Component {
  state = {
    editorState: deserialize(this.props.value || ''),
    fullScreen: false
  };

  componentWillMount() {
    this.initialBodyOverflowStyle = document.body.style.overflow;
  }

  handleChange = (editorState) => {
    this.props.onChange(Raw.serialize(editorState));

    console.log('handleChange #2');
    this.setState({ editorState });
    console.log('handleChange #3');
  };


  handleDocumentChange = (document, editorState) => {
    console.log('handleDocumentChange');
  };

  handleSelectionChange = (selection, editorState) => {
    console.log('handleSelectionChange');
  };


  handleFullScreen = () => {
    let fullScreen = !this.state.fullScreen;

    document.body.style.overflow = fullScreen ? 'hidden' : this.initialBodyOverflowStyle;

    this.setState({ fullScreen });
    this.props.onFullScreen(fullScreen);
  };

  onKeyDown(event, data, state) {
    return shortcuts(event, data, state);
  }

  render() {
    const { editorState } = this.state;
    const { children, extensions } = this.props;

    const fullScreen = this.props.fullScreen;

    let objectReferenceButtons = this.props.extensions.map((extension, index) => {
      return (
        <ObjectReferenceButton
          key={index}
          extension={extension}
          disabled={false}
        />
      );
    });

    return (
      <SlateEditor
        state={editorState}
        fullScreen={fullScreen}
        schema={schema}
        onChange={this.handleChange}
        onDocumentChange={this.handleDocumentChange}
        onSelectionChange={this.handleSelectionChange}
        plugins={[
          // AutocompletePlugin({ extensions: extensions, onChange: this.handleChange })
        ]}
      >

        <SlateContent />
      </SlateEditor>
    );
  }
}

PlainMarkdownInput.propTypes = {
  extensions: Types.array,
  value: Types.string,
  onChange: Types.func,
  onFullScreen: Types.func,
  fullScreen: Types.bool
};

PlainMarkdownInput.defaultProps = {
  extensions: [],
  value: '',
  fullScreen: false,
  onFullScreen: () => {},
  onChange: () => {}
};

export default PlainMarkdownInput;
