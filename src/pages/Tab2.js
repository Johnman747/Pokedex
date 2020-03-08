import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAlert } from '@ionic/react';
import './Tab2.css';
import firebase from '../config';
import CaughtPokemon from '../components/caughtPokemon/caughtPokemon';

class Tab2 extends Component {

  constructor(props) {
    super(props);
    this.capturedDatabase = firebase.database().ref().child('captured');
    this.teamDatabase = firebase.database().ref().child('team');
    this.state = {
      showAlert: false,
      subHeader: '',
    }
  }

  removePokemon = (id) => {
    this.capturedDatabase.child(id).remove();
  }

  addToTeam = (id, name, team) => {
    if (team === false) {
      if (this.props.state.team.length < 6) {
        this.teamDatabase.push({ pokemon: name, id: id })
        this.capturedDatabase.child(id).update({ team: true })
        this.setState({
          showAlert: true,
          subHeader: name + " has been added to your team!"
        });
      } else {
        this.setState({
          showAlert: true,
          subHeader: "Can't add more than 6 pokemon to a team."
        });
      }
    } else {
      this.setState({
        showAlert: true,
        subHeader: "OPS! Looks Like " + name + " is already on the team."
      });
    }
  }

  reset = () => {
    this.setState({
      showAlert: false,
    })
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle >Captured</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle color='primary' size="large">Captured</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonAlert onDidDismiss={this.reset} isOpen={this.state.showAlert} header={this.state.subHeader} buttons={['Ok']}></IonAlert>
          {this.props.state.capturedList.map(pokemon => {
            return (
              <CaughtPokemon key={pokemon.id} addToTeam={this.addToTeam} removePokemon={this.removePokemon} pokemon={pokemon} />
            )
          })}
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab2;
