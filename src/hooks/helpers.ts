import { DataInterface } from '../Models/EnsalamentData';

export interface FatherState {
  id: string;
  state: 'none' | 'some' | 'all';
}

const pushChildren = (
  id: string,
  dataVerify: string[],
  push: (data: string[]) => void
) => {
  if (dataVerify.includes(id)) {
    push(dataVerify.filter(value => value !== id));
  } else {
    push([...dataVerify, id]);
  }
};

const changeFatherState = (
  data: DataInterface[],
  childrenSelecteds: string[],
  fathersState: FatherState[],
  push: (data: FatherState[]) => void
) => {
  data.forEach(father => {
    const lengthChild = father.children?.length;
    let state: 'none' | 'some' | 'all';

    if (!father.children) {
      state = 'none';
    } else {
      const numberChildSelected = father.children.filter(value =>
        childrenSelecteds.some(selectd => selectd === value.id)
      ).length;

      if (numberChildSelected === 0) {
        state = 'none';
      } else if (lengthChild === numberChildSelected) {
        state = 'all';
      } else {
        state = 'some';
      }
    }

    if (!fathersState.some(v => v.state === state && v.id === father.id)) {
      const { id } = father;

      push(
        fathersState.map(value => {
          if (value.id === id) {
            return { ...value, state };
          }
          return value;
        })
      );
    }
  });
};

const pushChildrensByFatherId = (
  id: string,
  data: DataInterface[],
  fathersState: FatherState[],
  childrenSelecteds: string[],
  push: (data: string[]) => void
) => {
  const father: DataInterface | undefined = data.find(value => value.id === id);

  const fatherState: FatherState | undefined = fathersState.find(
    value => value.id === id
  );

  if (father && fatherState) {
    if (fatherState.state === 'all') {
      const newsSelecteds = childrenSelecteds.filter(
        val => !father.children?.some(v => v.id === val)
      );

      push(newsSelecteds);
    } else if (fatherState.state === 'none') {
      const newsSelecteds = father.children
        ?.filter(val => !childrenSelecteds.some(v => val.id === v))
        .map(v => v.id);
      if (newsSelecteds) {
        push([...childrenSelecteds, ...newsSelecteds]);
      }
    } else {
      const newsSelecteds = father.children
        ?.filter(val => !childrenSelecteds.some(v => val.id === v))
        .map(v => v.id);
      if (newsSelecteds) {
        push([...childrenSelecteds, ...newsSelecteds]);
      }
    }
  }
};

const teste = [
  {
    id: '1',
    name: 'Prédio 1',
    children: [
      {
        id: '1',
        name: 'Sala 1',
        info: '20 Lugares',
      },
      {
        id: '2',
        name: 'Sala 2',
        info: '20 Lugares',
      },
    ],
  },
  {
    id: '2',
    name: 'Prédio 2',
    children: [
      {
        id: '3',
        name: 'Sala 3',
        info: '20 Lugares',
      },
      {
        id: '4',
        name: 'Sala 4',
        info: '20 Lugares',
      },
    ],
  },
  { id: '3', name: 'Prédio 3' },
];

export { pushChildren, changeFatherState, pushChildrensByFatherId, teste };
