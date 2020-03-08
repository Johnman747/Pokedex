import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import firebase from '../config';
import TeamPokemon from '../components/teamPokemon/teamPokemon';

class Tab1 extends Component {

  constructor(props) {
    super(props);
    this.teamDatabase = firebase.database().ref().child('team');
    this.capturedPokemon = firebase.database().ref().child('captured')
  }


  removePokemon = (id, key) => {
    this.teamDatabase.child(key).remove();
    this.capturedPokemon.child(id).update({ team: false })
  }


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Team</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Team</IonTitle>
            </IonToolbar>
          </IonHeader>
          {this.props.state.team.map(pokemon => {
            return (
              <TeamPokemon key={pokemon.key} pokemon={pokemon} removePokemon={this.removePokemon} />
            )
          })}
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab1;
