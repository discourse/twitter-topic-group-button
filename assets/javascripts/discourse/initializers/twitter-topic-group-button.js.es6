import { on } from 'ember-addons/ember-computed-decorators';
import TopicController from 'discourse/controllers/topic';

export default {
  name: 'topic-group-button',
  initialize(container) {
    const ButtonView = container.lookupFactory('view:button');
    const MainButtons = container.lookupFactory('view:topic-footer-main-buttons');
    const siteSettings = container.lookup('site-settings:main');
    const user = container.lookup('current-user:main');
    const topic = container.lookup('controller:topic');

    const TopicGroup = ButtonView.extend({
      classNames: ['topic-group-button'],
      text: siteSettings.topic_group_button_label,
      title: siteSettings.topic_group_button_title,

      click() {
        const url = siteSettings.topic_group_button_url.replace('<TOPIC_ID>', topic.get('model.id')).replace('<USER_ID>', user.id).replace('<USERNAME>', user.username);
        window.open(url, '_blank');
      }
    });

    MainButtons.reopen({
      @on('additionalButtons')
      addTopicGroupButton() {
        if (user && user.can_see_topic_group_button) {
          this.attachViewClass(TopicGroup);
        }
      }
    });
  }
}
