import React, { Component } from 'react';
import { IonItem, IonButton, IonText, IonAlert } from '@ionic/react';

class caughtPokemon extends Component {

    state = {
        subHeader: "Are you sure you want to release " + this.props.pokemon.pokemon + "?", 
        showAlert: false,
    }

    addToTeam = (id, name, team) => {
        this.props.addToTeam(id, name, team);
    }

    confirmRemovePokemon = (id) =>{
        this.props.removePokemon(id)
    }

    removePokemon = () =>{
        this.setState({
            showAlert: true,
        })
    }

    reset = () => {
        this.setState({
            showAlert: false,
        })
    }
    render() {
        return (
            <IonItem>
                <IonAlert onDidDismiss={this.reset} isOpen={this.state.showAlert} header={this.state.subHeader}
                    buttons={[{
                        text: 'Cancel' }
                        , { text: 'Confirm', handler: () => { this.confirmRemovePokemon(this.props.pokemon.id) } }]}></IonAlert>
                <IonText>
                    <h1 >{this.props.pokemon.pokemon}</h1>
                </IonText>
                <IonButton size="default" slot="end" onClick={() => this.addToTeam(this.props.pokemon.id, this.props.pokemon.pokemon, this.props.pokemon.team)}>Add to Team</IonButton>
                <IonText color="primary" slot="end" onClick={() => this.removePokemon()}>X</IonText>
            </IonItem>
        )
    }
}

export default caughtPokemon;