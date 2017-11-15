# Decisions

1. Use two-way bindings with `ng-model` and one-way bindings for read-only components
2. Add class to the root component element instead of using the deprecated directive `replace: true` attribute
3. Use `component` method for **elements** only and `directive` method for **attributes**
4. Use `id` and `name` attributes on form components
5. Keep translation outside this library
6. Components
    1. Expose only form events that are really used
    2. Use the `text` attribute for component inner text without html inside
    3. Be more restrictive on component attributes and signature
    4. Throw warning when concurrent modifiers are used at the same time
    5. Throw warning when aria text are missing

## Use two-way bindings with `ng-model` and one-way bindings for read-only components

When a component requires something with `ng-model` (like an input, checkbox, ...) you should use two-way bindings. If the component only show values and no interaction are made with them you should use one-way bindings.

After some tests it has been found that, in angularJs, none of those solutions seems better but angularJs gives more tools for two-ways bindings than one-way. With two-ways bindings we can reuse ng-model with validations and it is easier to be propagate value changes to parent. Maybe it is not what angular 2 recommends, but it is easier and will cost less in development in short term.

## Add class to the root component element instead of using the deprecated directive `replace: true` attribute

Because the `replace: true` directive attribute has been deprecated since angular 1.5 this method should be prohibited. Also, this technic can create futur problem because angular produce conflit and they are hard to debug. Example: If you put an `ng-if` condition at the component's root element and the parent also put an `ng-if` on the component, the component can have weird behavior like never being added to DOM.

So, because `replace: true` can't be used, how use `:first-child` css classes if components are always wrapped? To resolve this problem lot of libraries are adding classes to the root element of component in the `link` method.

```javascript
angular.directive("test", function () {
  return {
    link: function ($scope, $element) {
      $element.addClass("test");
    }
  }
});
```

## Use `component` method for **elements** only and `directive` method for **attributes**

Since we can access `postLink` and `$element` from components we can still use the `component` method for components that are made for **elements** (`restrict: "E"`).

**Important:** Try to never use `$element` outside the `$postLink` method.

```javascript
angular.component("test", {
  controller: class TestCtrl {
    constructor($element) {
      this.$element = $element;
    }

    $postLink() {
      this.$element.addClass("test");
    }
  }
})
```

If a component is required on **attributes** (`restrict: "A"`) directive should used.

```javascript
angular.directive("test", function () {
  return {
    restrict: "A",
    link: function ($scope, $element) {
      $element.addClass("test");
    }
  }
});
```

## Keep translation outside this library

No translation should be stored in the library and strings should be given to the component in attributes.

## Components

### Expose only form events that are really used

Only form events really used from the component external point-of-view should be exposed through bindings. For example, on `oui-button` it has been chosen to expose only `on-click`, even if `on-focus` could exist, because only `on-click` will be used in real world. Other events, like `on-focus` may be used, but from the `link` method in first place.

### Use the `text` attribute for component inner text without html inside

On component that needs text inside of it but this text also needs to not contains html, like `oui-button`, the `text` attribute should be used.

### Be more restrictive on component attributes and signature

When a new component is in development phase and attributes and signatures are about to be choose, make sure to be restrictive as possible because the developer still can use native html/css to do its things.

### Throw warning when concurrent modifiers are used at the same time

When a component expose multiple modifiers that should not be used at the same time, like `primary` and `secondary` on `oui-button`, a warning should be thrown to let know the developer when he is doing something wrong.

### Throw warning when aria text are missing

To be sure that applications are accessible some texts are required and we should throw warning when possible. For example, on `oui-button` if no aria text is given the button is not fully accessible, so the developper should be warn to let him know.