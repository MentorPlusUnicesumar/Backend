interface CardMentoriaBase {
  nome: string;
  proximoEncontro: string;
}

export interface CardMentoriaAluno extends CardMentoriaBase {
  nomeMentor: string;
}

export interface CardMentoriaMentor extends CardMentoriaBase {
  nomeAluno: string;
}
