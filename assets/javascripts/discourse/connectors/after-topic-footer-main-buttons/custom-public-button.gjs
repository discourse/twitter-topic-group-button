import Component from "@ember/component";
import { on } from "@ember/modifier";
import { action } from "@ember/object";
import { classNames, tagName } from "@ember-decorators/component";

@tagName("span")
@classNames("after-topic-footer-main-buttons-outlet", "custom-public-button")
export default class CustomPublicButton extends Component {
  static shouldRender(args, context) {
    const { currentUser } = context;
    return currentUser?.can_see_topic_group_button;
  }

  @action
  clickButton() {
    const topic = this.outletArgs.topic;
    const user = this.currentUser;
    const url = this.siteSettings.topic_group_button_url
      .replace("<TOPIC_ID>", topic.get("model.id"))
      .replace("<USER_ID>", user.id)
      .replace("<USERNAME>", user.username);
    window.open(url, "_blank");
  }

  <template>
    <button
      {{on "click" this.clickButton}}
      type="button"
      title={{this.siteSettings.topic_group_button_title}}
      class="btn topic-group-button"
    >
      {{this.siteSettings.topic_group_button_label}}
    </button>
  </template>
}
