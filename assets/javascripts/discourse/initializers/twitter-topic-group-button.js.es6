import computed from 'ember-addons/ember-computed-decorators';

export default {
  name: 'topic-group-button',
  initialize(container) {
    const user = container.lookup('current-user:main');
    const topic = container.lookup('controller:topic');
    const siteSettings = container.lookup('site-settings:main');
    const TopicFooterButtonsComponent = container.lookupFactory('component:topic-footer-buttons');

    TopicFooterButtonsComponent.reopen({
      customButtonLabel: siteSettings.topic_group_button_label,
      customButtonTitle: siteSettings.topic_group_button_title,

      @computed('user.can_see_topic_group_button')
      canSeeTopicGroupButton() {
        return user && user.can_see_topic_group_button;
      },

      actions: {
        clickButton() {
          const url = siteSettings.topic_group_button_url.replace('<TOPIC_ID>', topic.get('model.id')).replace('<USER_ID>', user.id).replace('<USERNAME>', user.username);
          window.open(url, '_blank');
        }
      }
    });
  }
}
