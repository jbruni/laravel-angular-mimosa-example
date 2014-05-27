
define(['jquery', 'angular', 'es5-shim'], function($) { 

    var directives = {},
        isDefined = angular.isDefined,
        forEach = angular.forEach;

    directives.sliderHandler = ['$document', function($document) {
        return {
            restrict: 'EA',
            template: '<div class="slider-handler"></div>',
            replace: true,
            link: function(scope, iElement, iAttrs) {

                var startX, initialMouseX;
                iElement.css({position: 'absolute'});

                iElement.bind('mousedown', function($event) {
                    iElement.parent().addClass('dragging');
                    startX = iElement.prop('offsetLeft');
                    initialMouseX = $event.clientX;
                    $document.bind('mousemove', mousemove);
                    $document.bind('mouseup', mouseup);
                    return false;
                });

                function mousemove($event) {
                    var dx = $event.clientX - initialMouseX;
                    if (isDefined(iAttrs.emitHandlermove)) {
                        scope.$emit('handlermove', startX, dx, iElement);
                    } else {
                        iElement.css({
                            left: startX + dx + 'px'
                        });
                    }
                    return false;
                }

                function mouseup() {
                    iElement.parent().removeClass('dragging');
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);
                }
            }
        };
    }];

    directives.sliderInput = ['$timeout', function($timeout) {
        return {
            restrict: 'EA',
            template: '<div class="slider-input"><slider-handler emit-handlermove></slider-handler><div class="input-qtd hidden"><input type="number" ng-model="qtd"></div></div>',
            replace: true,
            require: 'ngModel',
            scope: true,
            link: function(scope, iElement, iAttrs, ngModel) {

                var minimumX = 0, maximumX, itemWidth,
                    handler = iElement.find('.slider-handler'),
                    values = (iAttrs.values || '').split(','),
                    positions = (iAttrs.positions || '').split(','),
                    ready = false, last = false;

                scope.qtd = 1 * values[values.length-1];

                $timeout(setConstraints, 108);

                function setConstraints() {
                    maximumX = minimumX + iElement.width() - handler.width();
                    itemWidth = (maximumX - minimumX) / (values.length - 1);
                    ready = true;
                    ngModel.$render();
                }

                ngModel.$render = function() {
                    if (ready) { renderValue(ngModel.$viewValue); }
                };

                scope.$on('handlermove', function(event, startX, dx) {
                    var index = Math.round((startX + dx - minimumX) / itemWidth);
                    if (!isDefined(values[index])) return;
                    scope.$apply(function() {
                        last = (index == values.length - 1);
                        ngModel.$setViewValue(values[index]);
                        ngModel.$render();
                    });
                });

                scope.$watch('qtd', function(value) {
                    if (last) ngModel.$setViewValue('' + value);
                });

                function renderValue(value) {
                    var index = $.inArray(value, values),
                        left = (isDefined(positions[index])? positions[index] * 1 : itemWidth * index) + minimumX;
                    if (index == -1) { last = true; scope.qtd = 1 * value; left = maximumX; }
                    if (left < minimumX) left = minimumX;
                    if (left > maximumX) left = maximumX;
                    handler.css({
                        left: left + 'px'
                    });
                    if ((index != -1) && (index != values.length - 1)) { last = false; }
                    if (last) { handler.next().removeClass('hidden'); values[values.length-1] = scope.qtd; } else { handler.next().addClass('hidden'); }
                }

            }
        };
    }];

    directives.sliderRange = ['$timeout', function($timeout) {
        return {
            restrict: 'EA',
            template: '<div class="slider-range"><div class="slider-range-left"></div><div class="slider-range-right"></div><div class="slider-range-fill"></div><slider-handler emit-handlermove class="min"></slider-handler><slider-handler emit-handlermove class="max"></slider-handler><div class="slider-range-center"></div><div class="slider-range-labels"></div></div>',
            replace: true,
            require: 'ngModel',
            scope: true,
            link: function(scope, iElement, iAttrs, ngModel) {

                var values, valuesLength, minimumX, maximumX, itemWidth, filler,
                    labels, labelWidth, itemsOffset, indexes, keys, ready;

                $timeout(initialize, 9);

                function initialize() {
                    if ((iAttrs.values === '') || (isDefined(ngModel.$viewValue.$resolved) && !ngModel.$viewValue.$resolved)) {
                        return $timeout(initialize, 108);
                    }
                    values = (iAttrs.values || '').split(',');
                    valuesLength = values.length;
                    minimumX = 0;
                    maximumX = iElement.width() - iElement.find('.slider-handler').width() - minimumX;
                    itemWidth = (maximumX - minimumX) / (valuesLength - 1);
                    filler = iElement.find('.slider-range-fill');
                    labels = iElement.find('.slider-range-labels');
                    labelWidth = Math.floor(iElement.width() / valuesLength);
                    itemsOffset = [];
                    indexes = [0, valuesLength];
                    keys = iAttrs.range.split(',');
                    var maxLabelLeft = labelWidth - iAttrs.labelImageWidth;
                    forEach(values, function(item, key) {
                        var labelOffset = (key / (valuesLength - 1)) * maxLabelLeft;
                        labels.append($('<div>').css({
                            'background-position': labelOffset + 'px center',
                            'width': labelWidth
                        }).addClass('range-value-' + item.replace(':', '-')));
                        itemsOffset[key] = labelOffset + (labelWidth * key);
                    });
                    scope.$watch(iAttrs.ngModel + '.' + keys[0], ngModel.$render);
                    scope.$watch(iAttrs.ngModel + '.' + keys[1], ngModel.$render);
                    ready = true;
                    ngModel.$render();
                }

                scope.$on('handlermove', function(event, startX, dx, handler) {
                    var index = Math.round((startX + dx - minimumX) / itemWidth),
                        isMin = handler.hasClass('min');
                    if (isMin && (index >= indexes[1])) index = indexes[1] - 1;
                    if (!isMin && (index <= indexes[0])) index = indexes[0] + 1;
                    if (index < 0) index = 0;
                    if (index >= valuesLength) index = valuesLength - 1;
                    indexes[isMin ? 0 : 1] = index;
                    scope.$apply(function() {
                        var viewValue = ngModel.$viewValue;
                        viewValue[keys[isMin ? 0 : 1]] = values[index];
                        ngModel.$setViewValue(viewValue);
                        renderRange();
                    });
                });

                ngModel.$render = function() {
                    if (!ready) return;
                    indexes[0] = $.inArray(ngModel.$viewValue[keys[0]], values);
                    indexes[1] = $.inArray(ngModel.$viewValue[keys[1]], values);
                    renderRange();
                };

                function renderRange() {
                    iElement.find('.slider-handler.min').css({
                        left: itemsOffset[indexes[0]] + 'px'
                    });
                    iElement.find('.slider-handler.max').css({
                        left: itemsOffset[indexes[1]] + 'px'
                    });
                    filler.css({
                        'left':  itemsOffset[indexes[0]] + 'px',
                        'width': itemsOffset[indexes[1]] - itemsOffset[indexes[0]] + 'px'
                    });
                }

            }
        };
    }];

    directives.select = ['$compile', '$timeout', '$parse', function($compile, $timeout, $parse) {
        var template =
            '<div ng-init="menuOpen=false" ng-class="{open: menuOpen}" ng-click="menuOpen = !menuOpen">{{ labels[:ng-model] }}</div>'+
            '<ul ng-show="menuOpen" ng-click="menuOpen = false">'+
            '    <li ng-repeat="(value, label) in labels" ng-class="{active: (active == value)}" ng-mouseenter="activate(value)" ng-click="set(value)">{{ label }}</li>'+
            '</ul>',
            NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/;

        return {
            restrict: 'C',
            require: 'ngModel',
            scope: true,
            link: function (scope, iElem, iAttrs, ngModelCtrl) {
                var valuesExp = iAttrs.ngOptions.match(NG_OPTIONS_REGEXP)[7],
                    valuesFn  = $parse(valuesExp),
                    $options;
                $timeout(init);
                scope.activate = function(value) {
                    scope.active = value;
                };
                scope.set = function(value) {
                    ngModelCtrl.$setViewValue(value);
                };
                scope.$watch('menuOpen', function(value) {
                    //iElem.closest('.dashboard.assinatura').css('position', value ? 'static' : 'relative');
                });
                function init() {
                    var values = valuesFn(scope), count = 0;
                    if (!isDefined(values)) {
                        return $timeout(init, 100);
                    }
                    forEach(values, function(){ count++; });
                    var options = iElem.find('option');
                    if ((count < 1) || (count < (options.length - 1))) {
                        return $timeout(init, 100);
                    }
                    // iElem.parent().css('position', 'relative');
                    iElem.addClass('hidden');
                    iElem.attr('tabindex', '-1');
                    scope.$watch(valuesExp, function(){ $timeout(buildOptions); });
                }
                function buildOptions() {
                    if ($options !== undefined) {
                        $options.remove();
                    }
                    scope.labels = {};
                    forEach(iElem.find('option'), function(option) {
                        var $option = angular.element(option);
                        // if ($option.text() == '') return;
                        scope.labels[$option.attr('value')] = $option.text();
                    });
                    $options = $compile(template.replace(/:ng-model/g, iAttrs.ngModel))(scope);
                    iElem.after($options);
                    scope.active = ngModelCtrl.$modelValue;
                }
            }
        };
    }];

    directives.pwCheck = [function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function() {
                    scope.$apply(function() {
                        var match = (elem.val() === $(firstPassword).val());
                        ctrl.$setValidity('pwmatch', match);
                    });
                });
            }
        };
    }];

    directives.money = function() {
        return {
            priority: 9000,
            require: 'ngModel',
            link: function(scope, iElement, iAttrs, ngModel) {
                ngModel.$parsers.push(function(text) {
                    return text ? (text + '').replace(',', '.') : '';
                });
                ngModel.$formatters.push(function(text) {
                    return text ? (text + '').replace('.', ',') : '';
                });
            }
        };
    };

    directives.produto = ['$document', '$timeout', function($document, $timeout) {
        return function(scope, iElement, iAttrs) {
            // offsetX = 58 = margin-left of "div.produto p.img span"
            var startX, startY, initialMouseX, initialMouseY, offsetX = 58, offsetY;
            iElement.css('cursor', 'pointer');

            iElement.bind('mousedown', function($event) {
                startX = iElement.prop('offsetLeft');
                startY = iElement.prop('offsetTop');
                offsetY = $('.widget.produtos .widget-body').scrollTop();
                iElement.css({
                    position: 'absolute',
                    cursor: 'move',
                    left: startX - offsetX + 'px',
                    top: startY - offsetY + 'px'
                });
                initialMouseX = $event.clientX;
                initialMouseY = $event.clientY;
                $document.bind('mousemove', mousemove);
                $document.bind('mouseup', mouseup);
                return false;
            });

            function mousemove($event) {
                var dx = $event.clientX - initialMouseX,
                    dy = $event.clientY - initialMouseY;
                iElement.css({
                    left: startX - offsetX + dx + 'px',
                    top: startY - offsetY + dy + 'px'
                });
                return false;
            }

            function mouseup($event) {
                iElement.css({
                    position: 'static',
                    cursor: 'pointer',
                    left: startX + 'px',
                    top: startY + 'px'
                });
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);

                var catIndex = angular.element(document.elementFromPoint($event.clientX, $event.clientY)).attr('cat-index');
                if (angular.isDefined(catIndex)) {
                    scope.incluirProdutoNaCategoria(scope.produtos.lista[iAttrs.prodIndex], scope.categorias.lista[catIndex]);
                }
            }
        };
    }];

    var filter_keys =  function() {
        return function(input) {
          if (!input) {
            return [];
          }
          return Object.keys(input);
        };
    };

    directives.register = function (module) {
        module.directive('sliderHandler', directives.sliderHandler);
        module.directive('slider', directives.sliderInput);
        module.directive('sliderRange', directives.sliderRange);
        module.directive('pdmSelect', directives.select);
        module.directive('pwCheck', directives.pwCheck);
        module.directive('money', directives.money);
        module.directive('produto', directives.produto);
        module.filter('keys', filter_keys);
        return module;
    };

    return directives.register(angular.module('pdmDirectives', []));

});
