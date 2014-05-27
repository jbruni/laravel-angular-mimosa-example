<!-- layouts.master.alerts -->
                <!-- Grid row -->
                <div class="row">

                    <!-- Alerts -->
                    <div id="alerts" class="col-sm-12" ng-init="alerts = []">

@if (Session::has('success')) 
                        <div class="alert alert-success alert-dismissable fade in">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true" title="" data-original-title="Fechar alerta">×</button>
                            <span>{{ Session::get('success') }}</span>
                        </div>
@endif

@if (Session::has('info')) 
                        <div class="alert alert-info alert-dismissable fade in">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true" title="" data-original-title="Fechar alerta">×</button>
                            <span>{{ Session::get('info') }}</span>
                        </div>
@endif

@if (Session::has('warning')) 
                        <div class="alert alert-warning alert-dismissable fade in">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true" title="" data-original-title="Fechar alerta">×</button>
                            <span>{{ Session::get('warning') }}</span>
                        </div>
@endif

@if (Session::has('danger')) 
                        <div class="alert alert-danger alert-dismissable fade in">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true" title="" data-original-title="Fechar alerta">×</button>
                            <span>{{ Session::get('danger') }}</span>
                        </div>
@endif

                        <div ng-cloak ng-repeat="alert in alerts" class="ng-cloak alert alert-dismissable fade in"
                             ng-class="{'alert-success': alert.type == 'success', 'alert-info': alert.type == 'info', 'alert-warning': alert.type == 'warning', 'alert-danger': alert.type == 'danger'}">
                            <button ng-click="alerts.splice($index, 1)" type="button" class="close" data-dismiss="alert" aria-hidden="true" title="" data-original-title="Fechar alerta" ng-bind="'x'"></button>
                            <span ng-bind="alert.message"></span>
                        </div>

                    </div>
                    <!-- /Alerts -->

                </div>
                <!-- /Grid row -->
<!-- /layouts.master.alerts -->
