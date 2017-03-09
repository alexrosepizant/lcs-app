export default function Idea($sce, User) {
  "ngInject"

  return (data) => {

    return angular.extend({
      title: "",
      description: "",
      created: Date.now(),
      categories: [],
      like: 0,

      hasCategory(category) {
        return this.categories.indexOf(category) !== -1
      },

      addCategory(category) {
        if (this.hasCategory()) {
          return false
        }
        return this.categories.push(category)
      },

      toggleCategory(category) {
        if (this.addCategory(category)) {
          return
        }
        this.categories.splice(this.categories.indexOf(category), 1)
      },
    }, data, {
      user: new User(data.user),
    })
  }
}
