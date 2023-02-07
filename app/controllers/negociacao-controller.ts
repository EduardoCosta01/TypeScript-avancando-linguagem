import { DiasDaSemana } from "../enums/DiasDaSemana.js";
import { Negociacoes } from "../models/negiciacoes.js";
import { Negociacao } from "../models/negociacao.js";
import { MensagemView } from "../views/mensagemView.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView', true);
    private mensagemView = new MensagemView('#mensagemView');


    constructor() {
        this.inputData = <HTMLInputElement> document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);

    }

    adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        
        if(!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações en dias útes são aceitas!')
            return
        }

        this.negociacoes.adcionar(negociacao);
        this.limpaFormulario();
        this.atualizaView();
    }


    private criaNegociacao(): Negociacao {
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value)
        const valor = parseFloat(this.inputValor.value)
        return new Negociacao(date, quantidade, valor)

    }


    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINDO && data.getDay() < DiasDaSemana.SABADO
    }


    private limpaFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus()

    }


    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso')
    }
}

