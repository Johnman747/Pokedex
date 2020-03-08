import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import firebase from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.capturedDatabase = firebase.database().ref().child('captured');
    this.teamDatabase = firebase.database().ref().child('team');
    this.state = {
      capturedList: [],
      team: [],
    }
  }

  componentDidMount() {
    const prevCapturedList = this.state.capturedList;
    const prevTeamList = this.state.team

    this.capturedDatabase.on('child_added', snap => {
      prevCapturedList.push({
        id: snap.key,
        pokemon: snap.val().pokemon,
        team: snap.val().team,
      })

      this.setState({
        capturedList: prevCapturedList,
      })
    })
    let startTeam = 0

    this.teamDatabase.on('child_added', snap => {
      prevTeamList.push({
        key: snap.key,
        id: snap.val().id,
        pokemon: snap.val().pokemon,
        teamNumber: startTeam += 1,
      })

      this.setState({
        team: prevTeamList,
      })
    })

    this.capturedDatabase.on('child_removed', snap => {
      for (var i = 0; i < prevCapturedList.length; i++) {
        if (prevCapturedList[i].id === snap.key) {
          prevCapturedList.splice(i, 1);
        }
      }

      this.setState({
        pokemon: prevCapturedList
      })
    })

    this.teamDatabase.on('child_removed', snap => {
      for (var i = 0; i < prevTeamList.length; i++) {
        if (prevTeamList[i].key === snap.key) {
          prevTeamList.splice(i, 1);
        }
      }
      this.setState({
        team: prevTeamList
      })
    })

    this.capturedDatabase.on('child_changed', snap => {
      let updatedPokemon = {
        id: snap.key,
        pokemon: snap.val().pokemon,
        team: snap.val().team,
      }

      for (var i = 0; i < prevCapturedList.length; i++) {
        if (prevCapturedList[i].id === snap.key) {
          prevCapturedList.splice(i, 1, updatedPokemon);
        }
      }

      this.setState({
        capturedList: prevCapturedList,
      })
    })

  }

  render() {
    return (
      <IonApp >
        <IonReactRouter>
          <IonTabs >
            <IonRouterOutlet>
              <Route path="/tab1" render={() => <Tab1 state={this.state} />} />
              <Route path="/tab2" render={() => <Tab2 state={this.state} />} />
              <Route path="/tab3" render={() => <Tab3 />} exact={true} />
              <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" color="primary">
              <IonTabButton tab="tab1" href="/tab1">
                {/* <IonIcon icon={triangle} /> */}
                <IonLabel>
                  Team
                </IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                {/* <IonIcon icon={ellipse} /> */}
                <IonLabel>Caputred</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                {/* <IonIcon icon={square} /> */}
                <IonLabel>Pokedex</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    );
  }
};

export default App;
