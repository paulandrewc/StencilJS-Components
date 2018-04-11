import { Component, Prop, State} from '@stencil/core';


@Component({
  tag: 'dashboard-element-container',
  styleUrl: 'dashboard-element-container.css'
})
export class DashboardElementContainer{
	@Prop() ElementTitle : string = "Dashboard Element";
	@State() collapsed: boolean = false;

	toggle() {
			this.collapsed = !this.collapsed;
	}

  render() {
		return(
			<div>
			<div id="header" onClick={this.toggle.bind(this)}>
					<span>{this.ElementTitle}</span>
			</div>
			<div id="content" hidden={this.collapsed}>
					<slot />
			</div>
	</div>
		);
  }
}