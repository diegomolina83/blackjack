/**
 * 2C = Dos de tréboles
 * 2H = Dos de corazones
 * 2D = Dos de diamantes
 * 2S = Dos de Picas
 * 
 */

(() => {
    'use strict'
   



    let deck = [];
    const tipos = ['C', 'H', 'S', 'D'],
          especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugador = 0,
        puntosComputadora = 0;

    //refeencias del HTMl
    // const nombreJugador = document.querySelector("#nombreJugador");
    const btnPEdir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo'),
          puntetes = document.querySelectorAll('small'),
          divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas');
    
          //Esta función crea una nueva baraja
    const crearDeck = () => {
        deck =[];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }

        deck = _.shuffle(deck);
        // console.log(deck);
        return deck;
    }

    crearDeck();

    //pedir el nombre del jugador y mostrarlo por pantalla
    // let nombre= prompt("¿Cuál es tu nombre?");
    // nombreJugador.innerHTML=nombre;


    //esta funcion me permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        const carta = deck.pop();
        // console.log(deck);
        // console.log(carta);
        return carta;
    }


    const valorCarta = (carta) => {
        let valor = carta.substring(0, carta.length - 1);
        switch (valor) {
            case 'A':
                valor = 11;
                break;
            case 'J':
            case 'Q':
            case 'K':
                valor = 10;
                break;

            default:
                return parseInt(valor);

            /**En vez de con un switch se puede hacer con un
             * if ((isNaN (valor)){
             * puntos = (valor ==='A') ? 11 : 10;
             * else {
             * puntos=valor*1;
             * }}
             * 
             */

            /**Otra opcion es:
             * let valor = carta.substring(0, carta.length - 1);
             * return (isNan(valor))?
             *         (valor === 'A' ) ? 11:10 
             *         : valor*1;
             */
        }

        return valor;
    }

    valorCarta(pedirCarta());

    //turno de la computadora
    const turnoComputadora = () => {
        do {
            const carta = pedirCarta();
            puntosComputadora += valorCarta(carta);
            puntetes[1].innerText = puntosComputadora;

            //<img class ="carta" src="/assets/cartas/10C.png" alt="">
            const imgCarta = document.createElement("img");
            imgCarta.src = `/assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);
            if (puntosJugador > 21) {
                break;
            }
        } while ((puntosComputadora < puntosJugador) && puntosJugador <= 21);
        setTimeout(() => {
            if (puntosComputadora === puntosJugador) {
                alert("Nadie Gana");
            } else if (puntosJugador > 21) {
                alert("Computadora Gana");
            } else if (puntosComputadora > 21) {
                alert("Jugador Gana");
            } else if (puntosComputadora > puntosJugador) {
                alert("Computadora Gana");
            }




        }, 700);

    }


    //Eventos

    //cuando se haga click en el botón se dispara la accion de la función
    btnPEdir.addEventListener('click', () => {

        const carta = pedirCarta();
        puntosJugador += valorCarta(carta);
        puntetes[0].innerText = puntosJugador;

        //<img class ="carta" src="/assets/cartas/10C.png" alt="">
        const imgCarta = document.createElement("img");
        imgCarta.src = `/assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);


        if (puntosJugador > 21) {
            console.log("Perdiste");
            btnPEdir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora();
        } else if (puntosJugador === 21) {
            btnPEdir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora();

        }


    })

    btnDetener.addEventListener('click', () => {
        btnPEdir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora();

    })

    btnNuevo.addEventListener('click', () => {
        
        deck = crearDeck();
        puntosJugador = 0;
        puntosComputadora = 0;
        // puntetes[0] =0;
        // puntetes[1] =0;
        puntetes[0].innerText = 0;
        puntetes[1].innerText = 0;
        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';
        btnPEdir.disabled = false;
        btnDetener.disabled = false;
        console.clear();

    })

})();