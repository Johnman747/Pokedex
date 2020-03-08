import React, { Component } from 'react';
import './pokemon.css';
import { IonItem, IonButton, IonText, IonAlert } from '@ionic/react';

class Pokemon extends Component {

    state = {
        showAlert: false,
        subheader: this.props.name + ' has been added to your collection!',
    }

    addPokemon = (id, name) => {
        this.props.addCaught(name)
        this.setState({
            showAlert: true,
        })
    }

    reset = ()=>{
        this.setState({
            showAlert: false,
        })
    }

    render() {
        return (
            <IonItem>
                <IonAlert onDidDismiss={this.reset} header="Congrats!" subHeader={this.state.subheader} isOpen={this.state.showAlert} buttons={['OK']}></IonAlert>
                <IonText>
                    <h1>{this.props.id}. </h1>
                </IonText>
                <IonText>
                    <h1> {this.props.name}</h1>
                </IonText>
                <IonButton size="default" slot="end" onClick={() => this.addPokemon(this.props.id, this.props.name)}>Caught</IonButton>
            </IonItem>
        )
    }
}

export default Pokemon;