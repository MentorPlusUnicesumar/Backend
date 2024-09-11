interface CardMentoriaBase {
  nome: string;
  proximoEncontro: string;
}

export interface CardMentoriaMentorado extends CardMentoriaBase {
  nomeMentor: string;
}

export interface CardMentoriaMentor extends CardMentoriaBase {
  nomeMentorado: string;
}
