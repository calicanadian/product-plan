import React from 'react';
import { Redirect , BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Registration from "./auth/Registration";
import Login from "./auth/Login";

class ProductPlanApp extends React.Component {
  constructor() {
    super();

    window.checkCompletedSteps = this.checkCompletedSteps.bind(this);
    // window.getStep = this.getStep.bind(this);
    window.checkLoginStatus = this.checkLoginStatus.bind(this);
    window.handleLogin = this.handleLogin.bind(this);
    window.handleLogout = this.handleLogout.bind(this);
    window.handleStepsCompleted = this.handleStepsCompleted.bind(this);
    window.activateAddLane = this.activateAddLane.bind(this);
    window.activateAddBar = this.activateAddBar.bind(this);
    window.createNewRow = this.createNewRow.bind(this);
    window.updateStepsCompleted = this.updateStepsCompleted.bind(this);
    // window.displayNextStep = this.displayNextStep.bind(this);

    this.state = {
      loggedInStatus: "Logged Out",
      completedSteps: {},
      user: {},
      productLanes: []
    }
  }

  componentDidMount(data) {
    this.checkLoginStatus(data);
  }

  checkLoginStatus(data) {
    console.log("in checkLoginStatus");
    axios.get("/logged_in", { withCredentials: true }).then(response => {
      console.dir(response);
      if (response.data.logged_in && this.state.loggedInStatus === "Logged Out") {
        console.log("login status green");
        this.setState({
          loggedInStatus: "Logged In",
          user: response.data.user
        });
        checkCompletedSteps();
      } else if (!response.data.logged_in && this.state.loggedInStatus === "Logged In") {
        console.log("login status red");
        this.setState({
          loggedInStatus: "Logged Out",
          user: {}
        });
        return <Redirect to='/login' />;
      } else if (!response.data.logged_in && this.state.loggedInStatus === "Logged Out") {
        // should be redirecting to login screen, but isn't.
        return <Redirect to='/login' />;
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
  }

  checkCompletedSteps() {
    axios.get("/steps_completed", { withCredentials: true }).then(response => {
      if (response.data.status === 302) {
        var stepsArray = response.data.steps_completed;
        if (stepsArray) {
          this.setState({
            completedSteps: stepsArray[stepsArray.length -1]
          });
          var step = "step" + stepsArray.length;
          $("#" + step).addClass("show");
        }
      } else if (response.data.status === 401) {
        return <Redirect to='/login' />;
      }
    }).catch(error => {
      console.log("error in steps completed", error);
    });
  }

  handleStepsCompleted(stepsArray) {

  }

  updateStepsCompleted(modal, step) {
    $(modal).removeClass('show');
    axios.post("/complete_step/" + step, { withCredentials: true }).then(response => {
      if (response.data.status === "updated") {
        this.setState({
          completedSteps: response.data.steps_completed,
          user: response.data.user
        });

      }
    }).catch(error => {
      console.log("Error updating step completed", error);
    });
  }

  createNewRow() {
    axios.post("/product_lanes", { withCredentials: true }).then(response => {
      if (response.data.status === 'created') {
        this.setState({
          productLanes: [response.data.product_lane]
        });
      }
    })
  }

  activateAddLane() {
    console.log("Im in the activate add Bar function");
    $("#addLane").draggable();
  }

  activateAddBar(step) {
    console.log("Im in the activate add Bar function");
    var snapToRow = null;
    $("#addBar").draggable({
      revert: false,
      helper: "clone",
      drop: function(event, ui) {
        var droppable = $(this);
        var draggable = ui.draggable;
        draggable.clone().appendTo(droppable);
        createNewRow()
      },
      start: function(event, ui) {
        $("#productRows").append("<div class='col-md-12 product-row'></div>");
        var snapToRow = $("#productRows .product-row").last();
      },
      stop: function(event, ui) {
        createNewRow(step);
      },
      snap: snapToRow, snapMode: "outer"
    });
  }

  render() {
    $(this.state.productRows).each(function(index, row) {
      console.log(index);
      console.log(row);
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
              <Login {...props} handleLogout={this.handleLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
            )}
            />
            <Route
            exact
            path={"/sign_up"}
            render={props =>(
              <Registration {...props} handleLogout={this.handleLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
            )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default ProductPlanApp
