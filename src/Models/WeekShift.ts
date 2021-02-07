export default interface Options {
  title: string;
  value: number | undefined;
}

export const weekOptions: Options[] = [
  { title: 'Segunda', value: 1 },
  { title: 'Terça', value: 2 },
  { title: 'Quarta', value: 3 },
  { title: 'Quinta', value: 4 },
  { title: 'Sexta', value: 5 },
  { title: 'Sábado', value: 6 },
  { title: 'Domingo', value: 7 },
];

export const shiftOptions: Options[] = [
  { title: 'Manhã', value: 1 },
  { title: 'Tarde', value: 2 },
  { title: 'Noite', value: 3 },
];
