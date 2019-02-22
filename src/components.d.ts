/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  TernaryPoint,
} from './Shared/types';


export namespace Components {

  interface DashboardElementContainer {
    'ElementTitle': string;
  }
  interface DashboardElementContainerAttributes extends StencilHTMLAttributes {
    'ElementTitle'?: string;
  }

  interface TernaryGraph {
    'CentralPoint': {"X","Y","X2"?,"Y2"?};
    'FadeEndHex': string;
    'FillColour': string;
    'OutlineHex': string;
    'aCornerOverlayPath': string;
    'aFadeName': string;
    'aFadeURL': string;
    'aHex': string;
    'abAxisLabel': string;
    'abTextPathHref': string;
    'abTextPathName': string;
    'acAxisLabel': string;
    'acTextPathHref': string;
    'acTextPathName': string;
    'axisLabelFontSize': number;
    'bCornerOverlayPath': string;
    'bFadeName': string;
    'bFadeURL': string;
    'bHex': string;
    'bcAxisLabel': string;
    'bcTextPathHref': string;
    'bcTextPathName': string;
    'cCornerOverlayPath': string;
    'cFadeName': string;
    'cFadeURL': string;
    'cHex': string;
    'circleRadius': number;
    'corners': {"A":{"X","Y"}, "B":{"X","Y"},"C":{"X","Y"}};
    'isSDITriangle': boolean;
    'mergeMatchingPoints': boolean;
    'recordArray': Array<TernaryPoint>;
    'showLabelsOnHover': boolean;
  }
  interface TernaryGraphAttributes extends StencilHTMLAttributes {
    'CentralPoint'?: {"X","Y","X2"?,"Y2"?};
    'FadeEndHex'?: string;
    'FillColour'?: string;
    'OutlineHex'?: string;
    'aCornerOverlayPath'?: string;
    'aFadeName'?: string;
    'aFadeURL'?: string;
    'aHex'?: string;
    'abAxisLabel'?: string;
    'abTextPathHref'?: string;
    'abTextPathName'?: string;
    'acAxisLabel'?: string;
    'acTextPathHref'?: string;
    'acTextPathName'?: string;
    'axisLabelFontSize'?: number;
    'bCornerOverlayPath'?: string;
    'bFadeName'?: string;
    'bFadeURL'?: string;
    'bHex'?: string;
    'bcAxisLabel'?: string;
    'bcTextPathHref'?: string;
    'bcTextPathName'?: string;
    'cCornerOverlayPath'?: string;
    'cFadeName'?: string;
    'cFadeURL'?: string;
    'cHex'?: string;
    'circleRadius'?: number;
    'corners'?: {"A":{"X","Y"}, "B":{"X","Y"},"C":{"X","Y"}};
    'isSDITriangle'?: boolean;
    'mergeMatchingPoints'?: boolean;
    'onRecordClicked'?: (event: CustomEvent) => void;
    'recordArray'?: Array<TernaryPoint>;
    'showLabelsOnHover'?: boolean;
  }
}

declare global {
  interface StencilElementInterfaces {
    'DashboardElementContainer': Components.DashboardElementContainer;
    'TernaryGraph': Components.TernaryGraph;
  }

  interface StencilIntrinsicElements {
    'dashboard-element-container': Components.DashboardElementContainerAttributes;
    'ternary-graph': Components.TernaryGraphAttributes;
  }


  interface HTMLDashboardElementContainerElement extends Components.DashboardElementContainer, HTMLStencilElement {}
  var HTMLDashboardElementContainerElement: {
    prototype: HTMLDashboardElementContainerElement;
    new (): HTMLDashboardElementContainerElement;
  };

  interface HTMLTernaryGraphElement extends Components.TernaryGraph, HTMLStencilElement {}
  var HTMLTernaryGraphElement: {
    prototype: HTMLTernaryGraphElement;
    new (): HTMLTernaryGraphElement;
  };

  interface HTMLElementTagNameMap {
    'dashboard-element-container': HTMLDashboardElementContainerElement
    'ternary-graph': HTMLTernaryGraphElement
  }

  interface ElementTagNameMap {
    'dashboard-element-container': HTMLDashboardElementContainerElement;
    'ternary-graph': HTMLTernaryGraphElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
