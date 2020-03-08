import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar } from '@ionic/react';
import './Tab3.css';
import Pokemon from '../components/Pokemon/pokemon'
import { pokemonList } from '../Content/PokemonList'
import 'firebase/database';
import firebase from '../config'

class Tab3 extends Component {

  constructor(props){
    super(props);
    this.capturedDatabase = firebase.database().ref().child('captured');
    this.state = {
      search: '',
      pokemon: pokemonList,
      searchArray: [],
    }
  }

  addCaught = (name) => {
    this.capturedDatabase.push().set({ pokemon: name, team: false });
    this.setState({ showAlert: true });
  }

  handelSearch = (e) => {
    this.setState({
      search: e.target.value,
    })
  }

  render() {

    const filteredPokemon = this.state.pokemon.filter(
      (location) => {
          return location.name.toLowerCase().indexOf(
              this.state.search.toLowerCase()) !== -1;
      }
  );

    return (
      <IonPage >
        <IonHeader color="primary">
          <IonToolbar color="primary" class="toolbar">
            <IonTitle color="tertiary">Pokedex</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color="dark">
          <IonHeader collapse="condense" color="primary">
            <IonToolbar color="primary">
              <IonTitle color="tertiary" size="large">Pokedex</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonSearchbar placeholder="Search Pokedex..." value={this.state.search} className="searchbar" onIonChange={(e) => this.handelSearch(e)} />
          {filteredPokemon.map(pokemon => {
            return (
              <Pokemon name={pokemon.name} id={pokemon.id} key={pokemon.id} addCaught={this.addCaught} />
            )
          })}
        </IonContent>
      </IonPage>
    );
  }
};

export default Tab3;
