import React from 'react'
import s from './TeamList.module.css';
import Select from 'react-select';
import ITeamCard from './interfaces/TeamInterfaces';
import TeamCard from './teamCard/TeamCard';

export default function TeamList() {
    const cardAmount = [
        {value: 6, label: 6},
        {value: 12, label: 12},
        {value: 24, label: 24}
    ]

    const style = {
        control: (base: any) => ({
          ...base,
          border: 0,
          boxShadow: 'none'
        })
      };
      const testCards: ITeamCard[] = [
        { "name": "testteam1", "foundationYear": 1999, "imageUrl": "https://via.placeholder.com/150", "id": 1 },
        { "name": "testteam2", "foundationYear": 2000, "imageUrl": "https://via.placeholder.com/150", "id": 2 },
        { "name": "testteam3", "foundationYear": 2001, "imageUrl": "https://via.placeholder.com/150", "id": 3 }
      ]

    return (
        <>
            <div className={s.flex}>
                <span className={s.search}><input type="text" className={s.searchInput} placeholder="Search..."/></span>
                <button className={s.add}>Add +</button>
            </div>
            
            <div className={s.content}>
                { testCards.map(card => <TeamCard cardInfo={card} />) }
            </div>
            <span className={s.cardAmount}><Select options={cardAmount} defaultValue={{value: 6, label: 6}} menuPlacement="top" styles={style}/></span>
            <div className={s.pages}></div>
            
        </>
  )
}
