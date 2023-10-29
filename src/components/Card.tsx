import React, { Component } from 'react';
import { Character } from '../Interfaces';

interface Props {
  data: Character;
}

export default class Card extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <div className="w-[220px] flex flex-col border rounded-3xl border-green-500 items-center px-4 py-2 mb-2">
        <h2 className="font-bold">{data.name}</h2>
        <img src={data.image} className="my-4" alt={data.name} />
        <p>
          {data.species}, {data.gender}, {data.status}
        </p>
      </div>
    );
  }
}
