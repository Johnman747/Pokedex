import React, { Component } from 'react';
import { IonItem, IonButton, IonText, IonCard, IonAlert } from '@ionic/react';

class teamPokemon extends Component {
    state = {
        edit: false,
        pokemon: this.props.pokemon.pokemon,
        showAlert: false,
        subHeader: 'Remove ' + this.props.pokemon.pokemon + ' from team?',
    }

    confirmRemovePokemon = (id, key) => {
        this.props.removePokemon(id, key);
        window.location.reload(false);
    }

    removePokemon = () => {
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
            <IonCard>
                <IonAlert onDidDismiss={this.reset} isOpen={this.state.showAlert} header={this.state.subHeader}
                    buttons={[{
                        text: 'Cancel'
                    }
                        , { text: 'Confirm', handler: () => { this.confirmRemovePokemon(this.props.pokemon.id,this.props.pokemon.key) } }]}></IonAlert>
                <IonItem>
                    <IonText>
                        <h1>{this.props.pokemon.teamNumber}.</h1>
                    </IonText>
                    <IonText>
                        <h1>{this.props.pokemon.pokemon}</h1>
                    </IonText>
                    <IonButton slot="end" size="default" onClick={() => this.removePokemon()}>X</IonButton>
                </IonItem>
            </IonCard>
        )
    }
}

export default teamPokemon;