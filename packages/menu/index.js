// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {MDCMenuFoundation} from '@material/line-ripple/dist/mdc.lineRipple';

export default class Menu extends Component {

  foundation_ = null;

  state = {
    classList: new Set(),
    style: {},
  };

  componentDidMount() {
    this.foundation_ = new MDCMenuFoundation(this.adapter);
    this.foundation_.init();
  }


  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get adapter() {
    return {
      addClassToElementAtIndex: (index, className) => {
        const list = this.items;
        list[index].classList.add(className);
      },
      removeClassFromElementAtIndex: (index, className) => {
        const list = this.items;
        list[index].classList.remove(className);
      },
      addAttributeToElementAtIndex: (index, attr, value) => {
        const list = this.items;
        list[index].setAttribute(attr, value);
      },
      removeAttributeFromElementAtIndex: (index, attr) => {
        const list = this.items;
        list[index].removeAttribute(attr);
      },
      elementContainsClass: (element, className) => element.classList.contains(className),
      closeSurface: () => this.open = false,
      getElementIndex: (element) => this.items.indexOf(element),
      getParentElement: (element) => element.parentElement,
      getSelectedElementIndex: (selectionGroup) => {
        return this.items.indexOf(selectionGroup.querySelector(`.${cssClasses.MENU_SELECTED_LIST_ITEM}`));
      },
      notifySelected: (evtData) => this.emit(strings.SELECTED_EVENT, {
        index: evtData.index,
        item: this.items[evtData.index],
      }),
    };
  }

  get classes() {
    const {className} = this.props;
    const {classList} = this.state;
    return classnames('mdc-menu', Array.from(classList), className);
  }

  handleClick = (evt) => {
    this.props.onClick(evt);
    this.foundation_.handleClick(evt);
  }

  handleKeydown = (evt) => {
    this.props.onKeyDown(evt);
    this.foundation_.handleKeydown(evt);
  }


  render() {
    const {
      onKeyDown,
      onClick,
      ...otherProps
    } = this.props;
    return (
      <div
        onKeyDown={this.handleKeydown}
        onClick={this.handleClick}
        {...otherProps}>

      </div>
    );
  }
}

Menu.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
  anchorCorner: PropTypes.number,
  anchorMargin: PropTypes.object,
  anchorElement: PropTypes.object,
  fixed: PropTypes.bool,
  quickOpen: PropTypes.bool,
};

Menu.defaultProps = {
  className: '',
};
