import React from 'react';
import { Redirect , BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Registration from "./auth/Registration";
import Login from "./auth/Login";

class ProductPlanApp extends React.Component {
  constructor() {
    super();

    window.checkCompletedSteps = this.checkCompletedSteps.bind(this);
    window.checkLoginStatus = this.checkLoginStatus.bind(this);
    window.getProductLanes = this.getProductLanes.bind(this);
    window.getProductBars = this.getProductBars.bind(this);
    window.handleLogin = this.handleLogin.bind(this);
    window.handleLogout = this.handleLogout.bind(this);
    window.activateAddLane = this.activateAddLane.bind(this);
    window.activateAddBar = this.activateAddBar.bind(this);
    window.createNewLane = this.createNewLane.bind(this);
    window.createNewBar = this.createNewBar.bind(this);
    window.updateStepsCompleted = this.updateStepsCompleted.bind(this);

    this.state = {
      loggedInStatus: "Logged Out",
      completedSteps: [],
      user: {},
      productLanes: [],
      productBars: []
    }
  }

  componentDidMount(data) {
    this.checkLoginStatus(data);
    this.getProductLanes(data);
  }

  checkLoginStatus(data) {
    axios.get("/logged_in", { withCredentials: true }).then(response => {
      if (response.data.logged_in) {
        this.setState({
          loggedInStatus: "Logged In",
          user: response.data.user,
          productLanes: response.data.productLanes,
          productBars: response.data.productBars,
          completedSteps: response.data.steps_completed
        });
        if (this.state.productLanes) {
          activateAddLane();
          if (this.state.productBars) {
            var stepsArray = response.data.steps_completed;
            if (stepsArray) {
              activateAddBar(stepsArray.length);
              this.setState({
                completedSteps: stepsArray
              });
            }
          }
        }
        checkCompletedSteps();
      } else if (!response.data.logged_in && this.state.loggedInStatus === "Logged In") {
        this.setState({
          loggedInStatus: "Logged Out",
          user: {},
          productLanes: [],
          productBars: []
        });
        window.location.replace("/login");
      } else if (!response.data.logged_in && this.state.loggedInStatus === "Logged Out") {
        // should be redirecting to login screen, but isn't.
        window.location.replace("/login");
      }
    }).catch(error => {
      console.log("check login error", error);
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "Logged In",
      user: data.user
    });
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "Logged Out",
      user: {}
    });
    axios.delete("/logout", {withCredentials: true}).then(response => {
      if (response.data.logged_out) {
        window.location.replace("/login");
      }
    }).catch(error => {
      console.log("logout error: ", error);
    });
  }

  getProductLanes() {
    axios.get("/product_lanes", { withCredentials: true }).then(response => {
      var lanes = response.data.product_lanes;
      if (lanes) {
        this.setState({
          productLanes: lanes
        });
        $("#productRows").html('')
        $.each(lanes, function(index, lane) {
          // need to rework this so the bar starts at the appropriate part of the timeline
          $("#productRows").append("\
            <div class='col-md-12 lane-header'>\
              <i class='fa fa-caret-down' />\
              &nbsp;\
              " + lane.name + "\
            </div>\
            <div class='col-md-12 product-row no-padding " + lane.id + "' data-lane-id='" + lane.id + "'>\
              <div class='col-md-1 column' data-lane-id='" + lane.id + "' data-column='1'></div>\
              <div class='col-md-1 column' data-lane-id='" + lane.id + "' data-column='2'></div>\
              <div class='col-md-1 column' data-lane-id='" + lane.id + "' data-column='3'></div>\
              <div class='col-md-1 column' data-lane-id='" + lane.id + "' data-column='4'></div>\
              <div class='col-md-1 column' data-lane-id='" + lane.id + "' data-column='5'></div>\
              <div class='col-md-1 column' data-lane-id='" + lane.id + "' data-column='6'></div>\
              <div class='col-md-1 column' data-lane-id='" + lane.id + "' data-column='7'></div>\
              <div class='col-md-1 column' data-lane-id='" + lane.id + "' data-column='8'></div>\
              <div class='col-md-1 column' data-lane-id='" + lane.id + "' data-column='9'></div>\
              <div class='col-md-1 column' data-lane-id='" + lane.id + "' data-column='10'></div>\
              <div class='col-md-1 column' data-lane-id='" + lane.id + "' data-column='11'></div>\
              <div class='col-md-1 column' data-lane-id='" + lane.id + "' data-column='12'></div>\
            </div>\
          ");
        });
        getProductBars();
        checkLoginStatus();
        history.pushState(null, '/');
      } else {
        console.log("404 lanes");
      }
    }).catch(error => {
      console.log("getProductLanes error: ", error);
    });
  }

  getProductBars() {
    axios.get("/product_bars", { withCredentials: true }).then(response => {
      if (response.data.product_bars) {
        var bars = response.data.product_bars;
        if (bars) {
          $.each(bars, function(index, bar) {
            if (bar.length > 0) {
              $.each(bar, function(index, b) {
                var productLaneID = b.product_lane_id;
                var productLaneColumn = $("#productRows").find('.'+ productLaneID).find('[data-column="' + b.column + '"]');
                if (productLaneColumn) {
                  $(productLaneColumn).append("<div class='product-bar' data-product-lane-id='" + productLaneID + "' data-product-bar-id='" + b.id + "'><span>" + b.name + "</span></div>");
                } else {
                  console.log("couldn't find productLane");
                }
              });
            }
          });
        } else {
          console.log("404 bars");
        }
      }
    }).catch(error => {
      console.log("getProductBars error: ", error);
    });
  }

  checkCompletedSteps() {
    axios.get("/steps_completed", { withCredentials: true }).then(response => {
      if (response.data.user) {
        if (response.data.steps_completed) {
          var stepsLength = response.data.steps_completed.length;
          var nextStep = "#step" + stepsLength;
          switch(stepsLength) {
            case(1):
              // step 1: add a lane
              activateAddLane();
              $(nextStep).addClass("show");
              break;
            case(2):
              // step 2: add a bar
              activateAddLane();
              if (response.data.productLanes && response.data.productLanes.length >= 1) {
                if (!response.data.productBars || response.data.productBars.length <= 0) {
                  $(nextStep).addClass("show");
                } else {
                  activateAddBar(stepsLength);
                }
              }
              break;
            case(3):
              // step 3: add more bars
              activateAddLane();
              activateAddBar(stepsLength);
              if (response.data.productBars && response.data.productBars.length >= 1) {
                $(nextStep).addClass("show");
              }
              break;
            case(4):
              activateAddLane();
              activateAddBar(stepsLength);
              break;
            default:
              activateAddLane();
              activateAddBar(stepsLength);
              $("#step1").addClass("show");
              break;
          }
        }
      }
    }).catch(error => {
      console.log("error in steps completed", error);
    });
  }

  updateStepsCompleted(modal, step) {
    $(modal).removeClass('show');
    axios.post("/complete_step/" + step, { withCredentials: true }).then(response => {
      if (response.data.status === "updated") {
        this.setState({
          completedSteps: response.data.steps_completed,
          user: response.data.user,
          productLanes: response.data.productLanes,
          productBars: response.data.productBars,
          completedSteps: response.data.steps_completed
        });
        checkCompletedSteps();
      }
    }).catch(error => {
      console.log("Error updating step completed", error);
    });
  }

  createNewLane() {
    axios.post("/product_lanes", { withCredentials: true }).then(response => {
      if (response.data.status === 'created') {
        this.setState({
          productLanes: [response.data.product_lanes]
        });
        getProductLanes();
      }
    }).catch(error => {
      console.log("createNewLane error: ", error);
    });
  }

  createNewBar(laneID, columnID) {
    axios.post("/product_bars?product_lane_id=" + laneID + "&col=" + columnID, { withCredentials: true }).then(response => {
      var bars = response.data.product_bars
      if (bars) {
        this.setState({
          productBars: [bars]
        });
        getProductLanes();
      }
    }).catch(error => {
      console.log("createNewBar error: ", error);
    });
  }

  activateAddLane() {
    var snapToRow = $("#productRows .product-row").last();
    $("#addLane").draggable({
      revert: false,
      helper: "clone",
      drop: function(event, ui) {
        var droppable = $(this);
        var draggable = ui.draggable;
        draggable.clone().appendTo(droppable);
      },
      start: function(event, ui) {
      },
      stop: function(event, ui) {
        createNewLane();
      },
      snap: snapToRow, snapMode: "outer"
    });
  }

  activateAddBar(step) {
    var snapToRow = null;
    $("#addBar").draggable({
      revert: false,
      helper: "clone",
      start: function(event, ui) {
        $(".product-row .column").addClass("droppable").droppable({
          drop: function(event, ui) {
            createNewBar($(event.target).data('lane-id'), $(event.target).data('column'));
          }
        });
      },
      stop: function(event, ui) {
      },
      snap: snapToRow
    }).droppable({
      drop: function(event, ui) {
        var droppable = $(".product-row").droppable();
        var draggable = ui.draggable;
        draggable.clone().appendTo(droppable);
      },
    });
  }

  render() {
    $(this.state.productRows).each(function(index, row) {
      $("#productRows").append("<div class='col-md-12 product-row' data-product-row-id='" + row.id + "'></div>");
    });

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
            exact
            path={"/login"}
            render={props =>(
              <Login {...props} handleLogout={this.handleLogout()} handleLogin={this.handleLogin()} loggedInStatus={this.state.loggedInStatus} />
            )}
            />
            <Route
            exact
            path={"/sign_up"}
            render={props =>(
              <Registration {...props} handleLogout={this.handleLogout()} handleLogin={this.handleLogin()} loggedInStatus={this.state.loggedInStatus} />
            )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default ProductPlanApp
