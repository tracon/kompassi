// Generated by CoffeeScript 1.7.1
(function() {
  var BackendData, BootstrapWidget, DefaultWidget, FilterSelector, QFilterManager, QueryBuilder, ResultView, ValueFormatter, ViewSelector,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  BackendData = (function() {
    function BackendData(filterDefs, titleMap) {
      if (filterDefs == null) {
        filterDefs = null;
      }
      if (titleMap == null) {
        titleMap = null;
      }
      if (filterDefs != null) {
        this.setFilterDefs(filterDefs);
      }
      if (titleMap != null) {
        this.setTitleMap(titleMap);
      }
    }

    BackendData.prototype.setFilterDefs = function(filterDefs) {
      return this._filterDefs = filterDefs;
    };

    BackendData.prototype.setTitleMap = function(titleMap) {
      var key, title, tuple, _i, _len, _results;
      this._titleMap = {};
      this._order = [];
      _results = [];
      for (_i = 0, _len = titleMap.length; _i < _len; _i++) {
        tuple = titleMap[_i];
        key = tuple[0];
        title = tuple[1];
        this._titleMap[key] = title;
        _results.push(this._order.push(key));
      }
      return _results;
    };

    BackendData.prototype.setViewGroups = function(groupConfig) {
      return this._groupConfig = groupConfig;
    };

    BackendData.prototype.getViewGroups = function() {
      return this._groupConfig;
    };

    BackendData.prototype.getTitleById = function(id) {
      return this._titleMap[id];
    };

    BackendData.prototype.getTitleByIndex = function(index) {
      return this._titleMap[this._order[index]];
    };

    BackendData.prototype.getTitleIdByIndex = function(index) {
      return this._order[index];
    };

    BackendData.prototype.getFilterCount = function() {
      return this._filterDefs.length;
    };

    BackendData.prototype.getTitleCount = function() {
      return this._order.length;
    };

    BackendData.prototype.getFilterDefById = function(id) {
      return this._filterDefs[id];
    };

    BackendData.prototype.getTitleOrder = function() {
      return this._order;
    };

    return BackendData;

  })();

  window.BackendData = BackendData;

  DefaultWidget = (function() {
    function DefaultWidget() {}

    DefaultWidget.prototype.id = function(id) {
      if (id != null) {
        return "id=\"" + id + "\"";
      } else {
        return "";
      }
    };

    DefaultWidget.prototype.hidden = function(name) {
      return $("<input type=\"hidden\" name=\"" + name + "\">");
    };

    DefaultWidget.prototype.label = function(forId) {
      return $("<label for=\"" + forId + "\">");
    };

    DefaultWidget.prototype.button = function(id) {
      if (id == null) {
        id = null;
      }
      return $("<button type=\"button\" " + (this.id(id)) + ">");
    };

    DefaultWidget.prototype.select = function(id) {
      if (id == null) {
        id = null;
      }
      return $("<select " + (this.id(id)) + ">");
    };

    DefaultWidget.prototype.checkbox = function(id) {
      if (id == null) {
        id = null;
      }
      return $("<input type=\"checkbox\" " + (this.id(id)) + ">");
    };

    DefaultWidget.prototype.radio = function(id) {
      if (id == null) {
        id = null;
      }
      return $("<input type=\"radio\" " + (this.id(id)) + ">");
    };

    DefaultWidget.prototype.text = function(id) {
      if (id == null) {
        id = null;
      }
      return $("<input type=\"text\" " + (this.id(id)) + ">");
    };

    return DefaultWidget;

  })();

  BootstrapWidget = (function(_super) {
    __extends(BootstrapWidget, _super);

    function BootstrapWidget() {
      return BootstrapWidget.__super__.constructor.apply(this, arguments);
    }

    BootstrapWidget.prototype.button = function(id, type) {
      var btn, one, _i, _len;
      if (id == null) {
        id = null;
      }
      if (type == null) {
        type = null;
      }
      btn = BootstrapWidget.__super__.button.apply(this, arguments).button(id).addClass("btn");
      if (type instanceof Array) {
        for (_i = 0, _len = type.length; _i < _len; _i++) {
          one = type[_i];
          btn.addClass("btn-" + one);
        }
        return btn;
      } else {
        if (type != null) {
          return btn.addClass("btn-" + type);
        } else {
          return btn;
        }
      }
    };

    return BootstrapWidget;

  })(DefaultWidget);

  window.Widget = new BootstrapWidget();

  QFilterManager = (function() {
    QFilterManager._instance = null;

    QFilterManager.instance = function() {
      if (this._instance === null) {
        this._instance = new QFilterManager();
      }
      return this._instance;
    };

    function QFilterManager() {
      this.filters = {};
      this.matchers = {};
    }

    QFilterManager.registerFilter = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = QFilterManager.instance()).registerFilter.apply(_ref, args);
    };

    QFilterManager.prototype.registerFilter = function(typeName, filterClass, matcher) {
      if (matcher == null) {
        matcher = null;
      }
      this.filters[typeName] = filterClass;
      if (matcher !== null) {
        return this.matchers[typeName] = matcher;
      }
    };

    QFilterManager.prototype.findFilterName = function(filterPart) {
      var key, matcher, result, _ref;
      if (!(filterPart instanceof Object || filterPart in this.matchers)) {
        return filterPart;
      }
      _ref = this.matchers;
      for (key in _ref) {
        matcher = _ref[key];
        result = matcher(filterPart);
        if (result === true) {
          return key;
        }
      }
      return null;
    };

    QFilterManager.prototype.findFilter = function(filterPart) {
      var key;
      key = this.findFilterName(filterPart);
      if (key != null) {
        return this.filters[key];
      }
      return null;
    };

    return QFilterManager;

  })();

  QFilterManager.instance();

  window.QFilterManager = QFilterManager;

  FilterSelector = (function() {
    function FilterSelector(container) {
      this.container = container;
    }

    FilterSelector.prototype.setBackendData = function(backendData) {
      return this.backendData = backendData;
    };

    FilterSelector.prototype.render = function() {
      var groups;
      this.container.empty();
      this.container.append($("<option>").text("---"));
      groups = this.backendData.getViewGroups();
      if ((groups == null) || groups.length === 0) {
        return this._renderPlain();
      } else {
        return this._renderGroups();
      }
    };

    FilterSelector.prototype._renderPlain = function() {
      var i, item, title, titleId, _i, _ref;
      for (i = _i = 0, _ref = this.backendData.getTitleCount(); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        titleId = this.backendData.getTitleIdByIndex(i);
        if (this.backendData.getFilterDefById(titleId) == null) {
          continue;
        }
        title = this.backendData.getTitleById(titleId);
        item = $("<option>").text(title).prop("value", titleId);
        this.container.append(item);
      }
    };

    FilterSelector.prototype._renderGroups = function() {
      var anyItem, column, columns, group, groupConfig, groupTitle, item, _i, _j, _len, _len1, _ref;
      _ref = this.backendData.getViewGroups();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        groupConfig = _ref[_i];
        groupTitle = groupConfig[0];
        columns = groupConfig[1] instanceof Array ? groupConfig[1] : groupConfig.slice(1);
        group = $("<optgroup>").prop("label", groupTitle);
        anyItem = false;
        for (_j = 0, _len1 = columns.length; _j < _len1; _j++) {
          column = columns[_j];
          if (this.backendData.getFilterDefById(column) == null) {
            continue;
          }
          anyItem = true;
          item = $("<option>");
          item.text(this.backendData.getTitleById(column));
          item.prop("value", column);
          group.append(item);
        }
        if (anyItem) {
          this.container.append(group);
        }
      }
    };

    return FilterSelector;

  })();

  ViewSelector = (function() {
    ViewSelector.inputClass = "query_builder_view_select";

    ViewSelector.hiddenClass = "hidden";

    ViewSelector.idGen = function(i) {
      if (i == null) {
        i = null;
      }
      if (i !== null) {
        return "query_view_" + i;
      }
      return "query_view";
    };

    function ViewSelector(container) {
      this.container = container;
      this.keyToId = {};
    }

    ViewSelector.prototype.setViews = function(backendData) {
      return this._data = backendData;
    };

    ViewSelector.prototype._renderOne = function(title, id, key) {
      var container, input, label;
      container = $("<div>");
      input = Widget.checkbox(id);
      input.addClass(this.constructor.inputClass);
      input.data("key", key);
      label = Widget.label(id);
      label.text(title);
      container.append(input, label);
      return container;
    };

    ViewSelector.prototype.renderStr = function() {
      var container, i, id, key, title, toggle, views, _i, _len, _ref;
      container = $("<div>");
      toggle = Widget.button(null, "default");
      toggle.text("Toggle views");
      toggle.click((function(_this) {
        return function() {
          return _this.onToggleViews();
        };
      })(this));
      container.append(toggle);
      views = $("<div>");
      views.attr("id", this.constructor.idGen());
      views.addClass(this.constructor.hiddenClass);
      _ref = this._data.getTitleOrder();
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        key = _ref[i];
        title = this._data.getTitleById(key);
        id = this.constructor.idGen(i);
        views.append(this._renderOne(title, id, key));
        this.keyToId[key] = id;
      }
      container.append(views);
      return container;
    };

    ViewSelector.prototype.render = function() {
      return this.container.html(this.renderStr());
    };

    ViewSelector.prototype.getSelections = function() {
      var element, ids, inputs, _i, _len;
      inputs = this.container.find("." + this.constructor.inputClass + ":checked");
      ids = [];
      for (_i = 0, _len = inputs.length; _i < _len; _i++) {
        element = inputs[_i];
        ids.push($(element).data("key"));
      }
      return ids;
    };

    ViewSelector.prototype.onToggleViews = function() {
      var container;
      container = $("#" + this.constructor.idGen());
      return container.toggleClass(this.constructor.hiddenClass);
    };

    ViewSelector.prototype.setEnabled = function(viewKey, enabled) {
      var id;
      if (enabled == null) {
        enabled = true;
      }
      if (!(viewKey in this.keyToId)) {
        console.error("Key " + viewKey + " is not in key list.");
        return;
      }
      id = this.keyToId[viewKey];
      return $("#" + id).prop("checked", enabled);
    };

    return ViewSelector;

  })();

  QueryBuilder = (function() {
    function QueryBuilder(backendData) {
      this.filterIds = {};
      this.filterList = [];
      this.uiDebug = null;
      this._disableSelect = false;
      this._data = backendData;
      this.viewSelector = null;
      this._showID = false;
      this.backendUrl = null;
    }

    QueryBuilder.prototype.attachAdd = function(uiAddId) {
      var selector;
      this.uiAddId = uiAddId;
      this.uiAdd = $(uiAddId);
      this.uiAdd.change((function(_this) {
        return function() {
          return _this.onSelect();
        };
      })(this));
      selector = new FilterSelector(this.uiAdd);
      selector.setBackendData(this._data);
      return selector.render();
    };

    QueryBuilder.prototype.attachForm = function(uiFormId) {
      this.uiFormId = uiFormId;
      return this.uiForm = $(uiFormId);
    };

    QueryBuilder.prototype.attachDebug = function(uiDebugId) {
      this.uiDebugId = uiDebugId;
      return this.uiDebug = $(uiDebugId);
    };

    QueryBuilder.prototype.attachViewSelect = function(uiViewSelectId) {
      this.uiViewSelectId = uiViewSelectId;
      this.uiViewSelect = $(uiViewSelectId);
      this.viewSelector = new ViewSelector(this.uiViewSelect);
      this.viewSelector.setViews(this._data);
      return this.viewSelector.render();
    };

    QueryBuilder.prototype.attachResults = function(uiResultsId) {
      this.uiResultsId = uiResultsId;
      return this.uiResults = $(uiResultsId);
    };

    QueryBuilder.prototype.setBackend = function(url) {
      return this.backendUrl = url;
    };

    QueryBuilder.prototype.onSelect = function() {
      var container, containerId, flt, flt_type, rmButton, selected_id, type;
      if (this._disableSelect) {
        return;
      }
      selected_id = this.uiAdd.val();
      this._disableSelect = true;
      this.uiAdd.find("option:selected").removeAttr("selected");
      this.uiAdd.children(":first").attr("selected", "selected");
      this._disableSelect = false;
      type = this._data.getFilterDefById(selected_id);
      flt = null;
      flt_type = QFilterManager.instance().findFilter(type);
      if (flt_type != null) {
        flt = this.newFilter(flt_type, selected_id, type);
      }
      container = $("<div>");
      if (flt === null) {
        container.text("Data type '" + type + "' is currently not supported.");
      } else {
        if (this.uiDebug != null) {
          flt.setDebug("window.query_builder.onUpdateDebug();");
        }
        containerId = flt.id();
        rmButton = Widget.button(null, ["default", "sm", "remove"]).text("-");
        rmButton.click((function(_this) {
          return function() {
            return _this.onRmFilter(containerId);
          };
        })(this));
        container.attr("id", "container_" + containerId);
        container.append(rmButton);
        container.append(flt.title(), flt.createUi());
        this.filterList.push(flt);
      }
      return this.uiForm.append(container);
    };

    QueryBuilder.prototype.newFilter = function(flt_type, selected_id, type) {
      var flt;
      flt = new flt_type(selected_id, type);
      flt.setTitle(this._data.getTitleById(selected_id));
      if (selected_id in this.filterIds) {
        this.filterIds[selected_id]++;
      } else {
        this.filterIds[selected_id] = 0;
      }
      flt.setId(this.filterIds[selected_id]);
      return flt;
    };

    QueryBuilder.prototype.onUpdateDebug = function() {
      var asJson;
      asJson = JSON.stringify(this._getFilter());
      asJson += "\n\n" + JSON.stringify(this._getViews());
      return this.uiDebug.text(asJson);
    };

    QueryBuilder.prototype.onRmFilter = function(containerId) {
      var flt, i, _i, _len, _ref;
      this.uiForm.find("#container_" + containerId).remove();
      _ref = this.filterList;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        flt = _ref[i];
        if (flt.id() === containerId) {
          this.filterList.splice(i, 1);
          return;
        }
      }
      return console.error("ID '" + containerId + "' not found in filters.");
    };

    QueryBuilder.prototype._getFilter = function() {
      var flt, queryPart, result, _i, _len, _ref;
      result = [];
      _ref = this.filterList;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        queryPart = _ref[_i];
        flt = queryPart.createFilter();
        if (flt === null || flt.length === 0) {
          continue;
        }
        if (result.length === 0) {
          result.push("and");
        }
        result.push(flt);
      }
      return result;
    };

    QueryBuilder.prototype._getViews = function() {
      return this.queriedViews = this.viewSelector.getSelections();
    };

    QueryBuilder.prototype._postData = function() {
      var postData;
      postData = {
        "filter": JSON.stringify(this._getFilter()),
        "view": JSON.stringify(this._getViews())
      };
      return postData;
    };

    QueryBuilder.prototype.onExec = function() {
      var fn, postData;
      postData = this._postData();
      fn = (function(_this) {
        return function(data, status, xhdr) {
          return _this.onDataResult(data, status, xhdr);
        };
      })(this);
      return $.post(this.backendUrl, postData, fn, "json");
    };

    QueryBuilder.prototype.onExecPlain = function() {
      var filter, postData, views;
      postData = this._postData();
      filter = Widget.hidden("filter");
      filter.val(postData.filter);
      this.uiForm.append(filter);
      views = Widget.hidden("view");
      views.val(postData.view);
      this.uiForm.append(views);
      this.uiForm.attr("action", this.backendUrl);
      return this.uiForm.submit();
    };

    QueryBuilder.prototype.onDataResult = function(data, status, xhdr) {
      var view;
      view = new ResultView(this.uiResults, this._data, this.queriedViews, data);
      view.showID = this._showID;
      return view.render();
    };

    QueryBuilder.prototype.onToggleIDVisibility = function(selfID) {
      var self;
      this._showID = !this._showID;
      if (selfID == null) {
        return;
      }
      self = $("#" + selfID);
      if (this._showID) {
        self.addClass("btn-success");
        return self.removeClass("btn-default");
      } else {
        self.addClass("btn-default");
        return self.removeClass("btn-success");
      }
    };

    return QueryBuilder;

  })();

  ResultView = (function() {
    function ResultView(element, backendData, views, data) {
      this.rootElement = element;
      this._data = backendData;
      this.views = views;
      this.resultData = data;
      this.formatter = new ValueFormatter(backendData);
      this.showID = false;
    }

    ResultView.prototype._genGroup = function(root, groups, itemCount, title) {
      var th;
      if (title == null) {
        title = null;
      }
      root.append($("<colgroup>").prop("span", itemCount));
      th = $("<th>").prop("colspan", itemCount);
      if (title != null) {
        th.text(title);
      }
      return groups.append(th);
    };

    ResultView.prototype.genHeader = function(to) {
      var columns, content, groupConfig, groupTitle, groups, item, itemCount, output, title, titles, _i, _j, _len, _len1, _order, _ref;
      output = $("<thead>");
      groups = $("<tr>");
      titles = $("<tr>");
      _order = [];
      if (this.showID) {
        titles.append($("<th>").text("ID"));
        this._genGroup(to, groups, 1);
      }
      _ref = this._data.getViewGroups();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        groupConfig = _ref[_i];
        groupTitle = groupConfig[0];
        itemCount = 0;
        columns = groupConfig[1] instanceof Array ? groupConfig[1] : groupConfig.slice(1);
        for (_j = 0, _len1 = columns.length; _j < _len1; _j++) {
          item = columns[_j];
          if (__indexOf.call(this.views, item) >= 0) {
            _order.push(item);
            itemCount++;
            title = this._data.getTitleById(item);
            content = $("<th>").text(title);
            titles.append(content);
          }
        }
        if (itemCount > 0) {
          this._genGroup(to, groups, itemCount, groupTitle);
        }
      }
      output.append(groups);
      output.append(titles);
      to.append(output);
      return _order;
    };

    ResultView.prototype.render = function() {
      var content, data, element, field, formatted, link, linkFn, row, value, _i, _j, _len, _len1, _order, _ref;
      this.rootElement.empty();
      _order = this.genHeader(this.rootElement.append());
      data = $("<tbody>");
      _ref = this.resultData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        row = $("<tr>");
        if ("__url" in element) {
          link = element["__url"];
          linkFn = function(container, text) {
            return container.append($("<a>").attr("href", link).text(text));
          };
        } else {
          linkFn = function(container, text) {
            return container.text(text);
          };
        }
        if (this.showID) {
          row.append(linkFn($("<td>"), element["pk"]));
        }
        for (_j = 0, _len1 = _order.length; _j < _len1; _j++) {
          field = _order[_j];
          value = element[field];
          content = $("<td>");
          formatted = this.formatter.format(field, value);
          linkFn(content, formatted);
          row.append(content);
        }
        data.append(row);
      }
      return this.rootElement.append(data);
    };

    return ResultView;

  })();

  ValueFormatter = (function() {
    ValueFormatter.timeZone = null;

    ValueFormatter.locales = null;

    ValueFormatter.createDateOptions = function() {
      return {
        timeZone: ValueFormatter.timeZone
      };
    };

    ValueFormatter.dateSupportsLocales = function(fn) {
      var e;
      try {
        new Date()[fn]("i");
      } catch (_error) {
        e = _error;
        return e.name === "RangeError";
      }
      return false;
    };

    ValueFormatter.dateSupport = {
      toLocaleDateString: ValueFormatter.dateSupportsLocales("toLocaleDateString"),
      toLocaleTimeString: ValueFormatter.dateSupportsLocales("toLocaleTimeString"),
      toLocaleString: ValueFormatter.dateSupportsLocales("toLocaleString")
    };

    function ValueFormatter(backendData) {
      this.backendData = backendData;
      this.dateOptions = null;
    }

    ValueFormatter.prototype.format = function(field, value) {
      var fn_name, name, type;
      type = this.backendData.getFilterDefById(field);
      name = QFilterManager.instance().findFilterName(type);
      if (name == null) {
        return value;
      }
      fn_name = "_fmt_" + name;
      if (fn_name in this) {
        return this[fn_name](value, type);
      }
    };

    ValueFormatter.prototype._callDateLocale = function(dateObj, fn) {
      if (ValueFormatter.dateSupport[fn]) {
        if (this.dateOptions === null) {
          this.dateOptions = ValueFormatter.createDateOptions();
        }
        return dateObj[fn](ValueFormatter.locales, this.dateOptions);
      } else {
        return dateObj[fn]();
      }
    };

    ValueFormatter.prototype._fmt_date = function(value) {
      var date;
      date = new Date(value);
      return this._callDateLocale(date, "toLocaleDateString");
    };

    ValueFormatter.prototype._fmt_time = function(value) {
      var time;
      time = new Date(value);
      return this._callDateLocale(time, "toLocaleTimeString");
    };

    ValueFormatter.prototype._fmt_datetime = function(value) {
      var dt;
      dt = new Date(value);
      return this._callDateLocale(dt, "toLocaleString");
    };

    ValueFormatter.prototype._fmt_bool = function(value) {
      if (value) {
        return "Kyllä";
      } else {
        return "Ei";
      }
    };

    ValueFormatter.prototype._fmt_object_or = function(value, type) {
      if (value in type.values) {
        return type.values[value];
      }
      return value;
    };

    ValueFormatter.prototype._fmt_object_and = function(value, type) {
      var entry, results;
      if (value == null) {
        return "";
      }
      if (!value instanceof Array) {
        value = [value];
      }
      results = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = value.length; _i < _len; _i++) {
          entry = value[_i];
          _results.push(this._fmt_object_or(entry, type));
        }
        return _results;
      }).call(this);
      return results.join(", ");
    };

    return ValueFormatter;

  })();

  window.QueryBuilder = QueryBuilder;

  window.ValueFormatter = ValueFormatter;

}).call(this);