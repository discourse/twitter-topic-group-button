# frozen_string_literal: true
# name: twitter-topic-group-button
# about: adds a custom button at the bottom of a topic, visible only to staff or members of a specific group
# version: 0.1
# authors: Robin Ward, Arpit Jalan
# transpile_js: true

after_initialize do
  add_to_serializer(:current_user, :can_see_topic_group_button?) do
    return true if scope.is_staff?
    groups = Group.where("name IN (?)", SiteSetting.topic_group_button_allowed_group.split("|")).to_a
    groups.each do |group|
      return true if group && GroupUser.where(user_id: scope.user.id, group_id: group.id).exists?
    end
    false
  end
end
