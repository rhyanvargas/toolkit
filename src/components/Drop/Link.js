/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React from 'react';
import Component from '../../Component';
import CONTEXT_TYPES from './contextTypes';
import MODULE from './module';

export default class Link extends Component {
    static module = MODULE;

    static contextTypes = CONTEXT_TYPES;

    /**
     * Render the drop link.
     *
     * @returns {ReactElement}
     */
    render() {
        let props = this.props;

        return (
            <a
                role="menuitem"
                className={this.formatChildClass('link')}
                {...this.inheritNativeProps(props)}
            >
                {props.children}
            </a>
        );
    }

}
