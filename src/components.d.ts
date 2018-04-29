/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


declare global {
  interface HTMLDashboardElementContainerElement extends HTMLStencilElement {
    'ElementTitle': string;
  }
  var HTMLDashboardElementContainerElement: {
    prototype: HTMLDashboardElementContainerElement;
    new (): HTMLDashboardElementContainerElement;
  };
  interface HTMLElementTagNameMap {
    'dashboard-element-container': HTMLDashboardElementContainerElement;
  }
  interface ElementTagNameMap {
    'dashboard-element-container': HTMLDashboardElementContainerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'dashboard-element-container': JSXElements.DashboardElementContainerAttributes;
    }
  }
  namespace JSXElements {
    export interface DashboardElementContainerAttributes extends HTMLAttributes {
      'ElementTitle'?: string;
    }
  }
}


declare global {
  interface HTMLHolidayWidgetElement extends HTMLStencilElement {
    'applicationName': string;
    'holidayRemaining': number;
    'totalHoliday': number;
  }
  var HTMLHolidayWidgetElement: {
    prototype: HTMLHolidayWidgetElement;
    new (): HTMLHolidayWidgetElement;
  };
  interface HTMLElementTagNameMap {
    'holiday-widget': HTMLHolidayWidgetElement;
  }
  interface ElementTagNameMap {
    'holiday-widget': HTMLHolidayWidgetElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'holiday-widget': JSXElements.HolidayWidgetAttributes;
    }
  }
  namespace JSXElements {
    export interface HolidayWidgetAttributes extends HTMLAttributes {
      'applicationName'?: string;
      'holidayRemaining'?: number;
      'onRequestClicked'?: (event: CustomEvent) => void;
      'totalHoliday'?: number;
    }
  }
}


declare global {
  interface HTMLTernaryGraphElement extends HTMLStencilElement {
    'aHex': string;
    'abAxisLabel': string;
    'abFadeName': string;
    'abFadeURL': string;
    'abMixHex': string;
    'abMixOpacity': string;
    'abTextPathHref': string;
    'abTextPathName': string;
    'acAxisLabel': string;
    'acTextPathHref': string;
    'acTextPathName': string;
    'axisLabelFontSize': number;
    'bHex': string;
    'bcAxisLabel': string;
    'bcTextPathHref': string;
    'bcTextPathName': string;
    'cFadeEndHex': string;
    'cFadeEndOpacity': string;
    'cFadeName': string;
    'cFadeURL': string;
    'cHex': string;
    'circleRadius': number;
    'corners': {"A":{"X","Y"}, "B":{"X","Y"},"C":{"X","Y"}};
    'plotArray': Array<{"X","Y","Label"}>;
    'recordArray': Array<{"A","B","C","Label"}>;
  }
  var HTMLTernaryGraphElement: {
    prototype: HTMLTernaryGraphElement;
    new (): HTMLTernaryGraphElement;
  };
  interface HTMLElementTagNameMap {
    'ternary-graph': HTMLTernaryGraphElement;
  }
  interface ElementTagNameMap {
    'ternary-graph': HTMLTernaryGraphElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'ternary-graph': JSXElements.TernaryGraphAttributes;
    }
  }
  namespace JSXElements {
    export interface TernaryGraphAttributes extends HTMLAttributes {
      'aHex'?: string;
      'abAxisLabel'?: string;
      'abFadeName'?: string;
      'abFadeURL'?: string;
      'abMixHex'?: string;
      'abMixOpacity'?: string;
      'abTextPathHref'?: string;
      'abTextPathName'?: string;
      'acAxisLabel'?: string;
      'acTextPathHref'?: string;
      'acTextPathName'?: string;
      'axisLabelFontSize'?: number;
      'bHex'?: string;
      'bcAxisLabel'?: string;
      'bcTextPathHref'?: string;
      'bcTextPathName'?: string;
      'cFadeEndHex'?: string;
      'cFadeEndOpacity'?: string;
      'cFadeName'?: string;
      'cFadeURL'?: string;
      'cHex'?: string;
      'circleRadius'?: number;
      'corners'?: {"A":{"X","Y"}, "B":{"X","Y"},"C":{"X","Y"}};
      'plotArray'?: Array<{"X","Y","Label"}>;
      'recordArray'?: Array<{"A","B","C","Label"}>;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
