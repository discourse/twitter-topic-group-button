export default {
  shouldRender(args, component) {
    const { currentUser } = component;
    return currentUser && currentUser.can_see_topic_group_button;
  },

  actions: {
    clickButton() {
      const topic = this.args.topic;
      const user = this.currentUser;

      const url = this.siteSettings.topic_group_button_url.replace('<TOPIC_ID>', topic.get('model.id')).replace('<USER_ID>', user.id).replace('<USERNAME>', user.username);
      window.open(url, '_blank');
    }
  }
}
