import React, { useEffect, useState } from 'react'
import s from './TeamList.module.css';
import Select, { MultiValue, SingleValue } from 'react-select';
import TeamCard from './teamCard/TeamCard';
import { ITeamCard, ISelectOption, ITeam } from './Interfaces/Interfaces';
import { get } from '../../api/baseRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/redux';

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
  const token: string = useSelector<RootState, string>(state => state.authReducer.token);
  const [selectedOption, setSelectedOption] = useState<SingleValue<ISelectOption>>({value: 6, label: 6});
  const [teams, setTeams] = useState<ITeamCard[]>([]);

  const pageSizeHandler = (selectedOption: SingleValue<ISelectOption>) => {
    setSelectedOption(selectedOption);
  }
  const teamsToCards = (teams: ITeam[]):ITeamCard[] => {
    let teamcards = teams.map((team):ITeamCard => {
     return {name: team.name, foundationYear: team.foundationYear, imageUrl: team.imageUrl, id: team.id}
    });
    return teamcards;
  }
  const getData = async (page: number, pageSize: number) => {
    let teamFetch = await get(`/Team/GetTeams?Page=${1}&PageSize=${pageSize}`, token);
    let teamList: ITeam[] = teamFetch.data;
    
    let cards = teamsToCards(teamList);
    setTeams(cards);
  }
  
  useEffect(() => {
    let pageSize:number = selectedOption!.value;
    getData(1, pageSize);

  }, [selectedOption]);

  return (
    <>
        <div className={s.flex}>
            <span className={s.search}><input type="text" className={s.searchInput} placeholder="Search..."/></span>
            <button className={s.add}>Add +</button>
        </div>
        
        <div className={s.content}>
        { teams.length ? teams.map(card => <TeamCard cardInfo={card} key={card.id}/>) :
            <div className={s.noContent}>
              <svg width="482" height="320" viewBox="0 0 482 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M66.9306 290.451C66.9306 290.451 31.0377 222.019 75.9216 172.213C120.805 122.408 159.407 150.001 178.992 148.617C198.578 147.233 204.86 103.613 262.799 90.4557C320.739 77.2989 374.731 101.48 368.897 144.875C360.189 209.652 468.861 178.219 413.045 290.734L66.9306 290.451Z" fill="#E8F3FD"/>
                <path d="M382.96 277.227C386.924 272.438 391.641 265.768 387.639 265.28C383.923 264.827 381.467 270.774 380.081 275.72C379.674 275.563 379.254 275.429 378.821 275.315C380.124 269.296 379.96 261.029 377.518 262.368C375.483 263.485 375.647 269.92 376.09 274.869C373.67 274.672 371.023 274.904 368.37 275.278C367.798 271.829 366.54 267.03 364.143 266.926C361.697 266.821 364.496 272 366.683 275.533C366.174 275.614 365.668 275.698 365.163 275.784C364.238 274.339 362.857 272.728 361.371 272.872C359.845 273.021 361.715 274.675 363.58 276.056C357.128 277.168 351.487 278.094 350.137 274.374C347.543 267.218 338.884 254.73 329.963 253.954C321.041 253.178 298.645 276.003 283.83 273.131C232.653 263.211 207.477 291.306 207.477 291.306L282.921 290.494L394.679 290.933C394.679 290.933 390.791 282.283 382.96 277.227Z" fill="#A8D29F"/>
                <path d="M249.552 290.451C229.679 270.51 184.185 300.97 139.655 273.331C135.26 270.603 129.65 263.086 112.157 264.411C108.286 264.704 104.914 266.114 102.007 268.131C100.137 262.976 96.9607 257.195 92.2998 258.363C87.1279 259.661 93.4196 266.318 98.6091 270.936C98.2332 271.299 97.8669 271.67 97.5118 272.05C96.3212 271.083 94.5025 270.36 91.8403 270.958C88.063 271.808 92.3464 273.123 95.8521 273.949C89.9621 281.184 87.3191 290.242 87.3191 290.242L249.552 290.451Z" fill="#8EC181"/>
                <path d="M162.953 131.801C169.253 131.801 174.36 126.715 174.36 120.441C174.36 114.167 169.253 109.081 162.953 109.081C156.653 109.081 151.546 114.167 151.546 120.441C151.546 126.715 156.653 131.801 162.953 131.801Z" fill="#F8914C"/>
                <path d="M169.214 110.947C169.699 112.209 169.969 113.579 169.969 115.011C169.969 121.285 164.861 126.371 158.562 126.371C156.248 126.371 154.098 125.683 152.3 124.505C153.943 128.771 158.091 131.801 162.953 131.801C169.252 131.801 174.36 126.715 174.36 120.441C174.36 116.47 172.313 112.977 169.214 110.947Z" fill="#DE8041"/>
                <path d="M160.543 130.254C160.392 130.254 160.257 130.147 160.228 129.993C158.999 123.481 159.903 118.462 160.88 115.398C161.942 112.064 163.285 110.294 163.342 110.221C163.449 110.08 163.65 110.054 163.792 110.161C163.933 110.269 163.96 110.469 163.853 110.609C163.8 110.678 158.56 117.697 160.861 129.876C160.893 130.051 160.779 130.217 160.604 130.251C160.583 130.252 160.562 130.254 160.543 130.254Z" fill="#0B0755"/>
                <path d="M171.95 123.025C171.875 123.025 171.798 122.998 171.737 122.945C171.671 122.888 165.029 117.168 152.662 118.553C152.487 118.573 152.326 118.446 152.307 118.272C152.288 118.096 152.415 117.937 152.59 117.918C159.201 117.177 164.163 118.446 167.159 119.641C170.421 120.942 172.093 122.406 172.162 122.467C172.294 122.584 172.307 122.787 172.19 122.918C172.127 122.989 172.039 123.025 171.95 123.025Z" fill="#0B0755"/>
                <path d="M165.417 128.761C165.334 128.761 165.25 128.729 165.188 128.665C165.054 128.529 161.945 125.251 164.111 118.952C164.804 116.939 165.909 115.601 167.398 114.977C169.675 114.022 171.992 115.094 172.088 115.141C172.249 115.216 172.316 115.408 172.241 115.568C172.165 115.728 171.973 115.795 171.813 115.72C171.793 115.71 169.653 114.725 167.643 115.571C166.332 116.123 165.348 117.331 164.718 119.161C162.68 125.093 165.617 128.19 165.647 128.222C165.771 128.349 165.768 128.552 165.641 128.675C165.578 128.731 165.498 128.761 165.417 128.761Z" fill="#0B0755"/>
                <path d="M154.813 125.669C154.736 125.669 154.661 125.641 154.6 125.587C154.468 125.469 154.457 125.267 154.574 125.136C156.949 122.493 158.008 119.521 157.723 116.305C157.509 113.897 156.579 112.245 156.57 112.227C156.481 112.073 156.536 111.878 156.69 111.79C156.844 111.702 157.04 111.757 157.129 111.909C157.169 111.979 158.13 113.678 158.361 116.219C158.575 118.563 158.175 122.086 155.054 125.561C154.989 125.632 154.9 125.669 154.813 125.669Z" fill="#0B0755"/>
                <path d="M120.106 208.707C120.106 208.707 121.515 211.608 121.249 212.472C120.982 213.336 119.395 214.443 118.28 214.373C117.165 214.302 116.813 211.969 117.577 209.705C118.341 207.443 120.106 208.707 120.106 208.707Z" fill="#FFB27D"/>
                <path d="M133.746 162.596C133.746 162.596 115.793 183.222 115.833 185.622C115.873 188.022 120.29 191.203 122.478 191.134C124.607 191.067 139.782 176.833 139.697 176.067C139.611 175.297 133.746 162.596 133.746 162.596Z" fill="#EFCDA9"/>
                <path d="M116.416 208.137C115.283 199.531 115.858 185.371 115.858 185.371L124.268 186.447C124.268 186.447 122.981 205.935 120.645 209.43C120.643 209.428 116.817 211.187 116.416 208.137Z" fill="#EFCDA9"/>
                <path d="M160.9 136.958C160.9 136.958 162.45 132.153 161.322 131.55C157.145 129.323 157.007 125.769 155.754 126.016C154.5 126.262 156.388 132.838 157.788 135.896C159.184 138.953 160.9 136.958 160.9 136.958Z" fill="#FFB27D"/>
                <path d="M139.233 283.848C139.233 283.848 138.017 290.212 139.24 290.227C139.367 290.228 153.118 290.227 153.118 290.227C153.118 290.227 154.664 288.336 152.418 287.947C150.17 287.556 146.411 285.984 145.048 283.027C143.617 279.915 139.233 283.848 139.233 283.848Z" fill="#E4163A"/>
                <path d="M121.829 284.014C121.829 284.014 120.709 289.27 121.7 290.229H135.852C135.797 289.814 136.914 288.443 135.011 288.112C132.764 287.721 129.004 286.149 127.642 283.192C126.21 280.08 121.829 284.014 121.829 284.014Z" fill="#E4163A"/>
                <path d="M147.747 217.262C147.747 217.262 144.295 229.046 136.795 251.776C129.295 274.507 127.83 283.558 127.83 283.558C127.83 283.558 126.87 282.881 125.026 282.903C123.299 282.923 121.83 284.014 121.83 284.014C121.83 284.014 121.602 260.305 125.058 248.875C128.514 237.444 125.804 207.667 125.804 207.667L147.747 217.262Z" fill="#FCA56B"/>
                <path d="M151.661 208.368C151.661 208.368 151.946 227.664 148.594 251.356C145.241 275.049 144.851 282.668 144.851 282.668C144.851 282.668 143.925 282.396 142.203 282.496C140.443 282.598 139.234 283.846 139.234 283.846C139.234 283.846 134.16 262.033 135.535 250.176C136.91 238.316 128.355 209.12 128.355 209.12L151.661 208.368Z" fill="#FFB27D"/>
                <path d="M125.802 207.667C125.802 207.667 127.611 237.252 124.153 248.683L135.339 252.737C137.301 227.304 147.746 217.262 147.746 217.262L125.802 207.667Z" fill="#C70B2C"/>
                <path d="M151.661 208.368L128.355 209.12C128.355 209.12 135.545 237.518 134.169 249.376L149.433 251.356C152.786 227.664 151.661 208.368 151.661 208.368Z" fill="#E4163A"/>
                <path d="M136.119 163.213L139.905 166.006L145.379 164.859C145.304 164.361 144.942 162.302 144.613 160.437C144.594 160.326 144.573 160.216 144.555 160.109C144.274 158.521 144.03 157.157 144.03 157.157L138.917 154.619L137.012 153.673C137.017 153.707 137.16 155.435 137.179 155.688C137.536 160.168 136.119 163.213 136.119 163.213Z" fill="#FFB27D"/>
                <path d="M144.995 161.803C144.875 161.753 137.55 159.6 136.755 159.862C135.959 160.125 135.489 161.657 135.489 161.657L147.471 164.355C147.469 164.354 146.526 162.445 144.995 161.803Z" fill="#EFCDA9"/>
                <path d="M125.269 210.75C126.511 216.392 147.177 217.062 152.503 211.94C153.107 211.356 153.139 208.641 152.91 204.98C152.596 199.964 151.798 193.174 151.329 187.67C151.128 185.323 150.99 183.212 150.972 181.569C150.945 178.915 150.578 176.2 150.092 173.734C149.738 171.947 148.858 170.15 147.844 168.556C145.884 165.467 143.44 163.145 143.44 163.145C143.44 163.145 137.375 161.105 135.487 161.657C126.387 164.318 124.028 205.108 125.269 210.75Z" fill="#F9DDBF"/>
                <path d="M137.563 155.766C138.686 157.905 142.868 159.755 144.613 160.435C144.593 160.325 144.572 160.214 144.555 160.107C144.274 158.52 144.029 157.155 144.029 157.155L138.917 154.617C137.786 154.601 137.098 154.885 137.563 155.766Z" fill="#FCA56B"/>
                <path d="M146.513 156.857C146.513 156.857 137.291 159.723 135.588 153.976C133.885 148.229 131.547 144.728 137.364 142.656C143.18 140.584 144.979 142.438 146.015 144.219C147.052 146 148.867 155.965 146.513 156.857Z" fill="#FFB27D"/>
                <path d="M145.405 143.352C145.405 143.352 143.954 150.352 142.566 150.062C141.178 149.771 139.918 149.557 140.12 151.573C140.324 153.589 142.249 155.917 137.969 156.274C133.689 156.63 127.535 145.638 128.711 143.557C132.105 137.552 150.308 136.027 145.405 143.352Z" fill="#163560"/>
                <path d="M142.94 179.353C144.373 182.448 146.986 186.387 151.328 187.669C151.128 185.321 150.989 183.211 150.972 181.568C150.944 178.913 150.578 176.198 150.091 173.733C149.738 171.945 148.857 170.149 147.843 168.555C146.465 169.573 145.114 170.933 144.013 172.165C142.252 174.134 141.831 176.958 142.94 179.353Z" fill="#EFCDA9"/>
                <path d="M139.002 163.144C139.002 163.144 141.014 160.915 144.613 160.435C147.863 160.001 159.336 155.361 159.754 153.877C160.061 152.782 157.129 134.419 157.095 134.824C157.095 134.824 159.155 132.68 161.592 133.995C161.592 133.995 169.59 155.469 168.229 158.339C166.139 162.747 141.47 177.406 140.979 177.646C138.162 179.009 139.002 163.144 139.002 163.144Z" fill="#F9DDBF"/>
                <path d="M215.321 135.307H216.121C216.121 135.307 217.377 131.009 216.441 129.868C215.504 128.728 213.19 127.699 212.67 128.649C212.149 129.601 211.95 133.131 212.315 134.531C212.679 135.932 215.321 135.307 215.321 135.307Z" fill="#FFB27D"/>
                <path d="M243.14 162.209C247.083 162.677 250.006 161.603 249.896 159.142C249.541 157.237 249.217 155.293 249.191 153.715C249.18 153.129 249.22 152.509 249.331 151.808L240.483 151.656L240.43 152.52L240.057 158.509L239.94 160.413C239.942 160.413 239.199 161.744 243.14 162.209Z" fill="#FFB27D"/>
                <path d="M240.059 158.507C240.676 158.707 241.348 158.822 242.075 158.822C245.586 158.822 249.073 153.188 249.182 152.488L241.542 152.336L240.432 152.518L240.059 158.507Z" fill="#FCA56B"/>
                <path d="M238.997 154.701C238.997 154.701 248.781 156.669 249.919 150.582C251.056 144.496 253.084 140.649 246.885 139.136C240.687 137.622 239.035 139.718 238.159 141.659C237.282 143.598 236.48 154.032 238.997 154.701Z" fill="#FFB27D"/>
                <path d="M246.193 290.246C246.193 290.246 246.575 287.328 247.422 285.641C248.269 283.955 253.658 285.029 253.658 285.029C253.658 285.029 254.755 285.963 254.986 290.256L246.193 290.246Z" fill="#E4163A"/>
                <path d="M228.007 290.251C229.273 289.482 228.398 284.058 228.398 284.058C228.398 284.058 222.498 279.357 221.686 282.955C220.875 286.554 216.081 288.17 213.353 288.611C211.47 288.915 211.589 289.722 211.622 290.253H228.007V290.251Z" fill="#E4163A"/>
                <path d="M240.072 248.809C239.831 250.128 237.559 251.195 237.519 251.971C236.971 262.625 230.195 280.017 228.438 284.329C225.857 283.803 225.054 283.883 223.126 283.27C222.327 283.016 222.215 283.03 221.686 282.955C225.875 263.782 225.734 237.308 226.294 220.963C226.577 212.729 227.996 207.043 227.996 207.043C227.996 207.043 248.622 201.563 248.744 208.496C248.852 214.63 241.911 238.688 240.072 248.809Z" fill="#FFB27D"/>
                <path d="M240.072 248.809L226.293 220.963C226.576 212.729 227.994 207.043 227.994 207.043C227.994 207.043 248.621 201.563 248.743 208.496C248.852 214.63 241.911 238.688 240.072 248.809Z" fill="#233862"/>
                <path d="M237.518 208.123L247.886 285.16C247.886 285.16 250.01 284.363 253.657 285.028C253.657 285.028 256.328 245.63 256.063 235.51C255.796 225.392 260.116 208.396 257.242 206.526C254.366 204.656 237.518 208.123 237.518 208.123Z" fill="#FFB27D"/>
                <path d="M227.994 207.043C227.994 207.043 226.576 212.731 226.293 220.963C225.732 237.309 225.393 239.577 224.472 251.892L239.639 251.982C239.68 251.208 239.832 250.126 240.073 248.808C241.913 238.688 248.854 214.629 248.744 208.494C248.621 201.561 227.994 207.043 227.994 207.043Z" fill="#E4163A"/>
                <path d="M240.072 248.809L226.293 220.963C226.576 212.729 227.994 207.043 227.994 207.043C227.994 207.043 248.621 201.563 248.743 208.496C248.852 214.63 241.911 238.688 240.072 248.809Z" fill="#C70B2C"/>
                <path d="M235.483 208.52L241.818 254.246C241.818 254.246 253.386 255.681 257.11 254.761C257.11 254.761 258.092 245.592 257.825 235.473C257.558 225.355 260.116 208.396 257.242 206.526C254.366 204.656 235.483 208.52 235.483 208.52Z" fill="#E4163A"/>
                <path d="M279.727 153.392C279.762 153.244 279.782 153.108 279.788 152.993C279.831 152.153 279.766 150.515 279.573 149.697C279.38 148.88 276.358 147.262 275.556 147.428C274.754 147.596 274.774 150.02 274.637 150.96C274.504 151.888 276.392 154.592 276.435 154.654C276.302 155.35 275.015 161.998 273.567 166.868C273.186 168.15 272.794 169.308 272.41 170.201C271.938 171.3 260.633 165.296 252.557 161.222C252.537 161.212 252.518 161.203 252.499 161.193C250.608 160.241 248.432 161.835 248.781 163.916L249.719 169.521C251.323 172.411 268.861 180.243 278.061 177.484C278.061 177.484 280.366 174.438 280.591 168.848C280.752 164.843 280.627 159.595 279.727 153.392Z" fill="#FFB27D"/>
                <path d="M235.768 137.491C235.768 137.491 238.496 137.281 241.714 135.889C244.326 134.758 247.622 136.004 248.692 136.564C248.663 136.393 248.594 136.158 248.431 135.923C248.431 135.923 248.912 136.262 248.982 136.736C249.032 136.772 249.055 136.796 249.042 136.806C249.042 136.806 249.587 136.707 249.937 136.864C249.937 136.864 249.693 136.828 249.604 136.985C249.595 137.001 249.582 137.016 249.566 137.028C253.64 138.988 254.016 145.401 252.705 146.886C251.127 148.672 249.236 152.691 249.236 152.691C249.236 152.691 248.547 151.74 248.833 150.171C249.121 148.6 247.758 148.6 246.036 147.886C244.315 147.172 245.75 145.172 244.243 143.958C242.737 142.744 238.965 143.63 237.287 142.529C235.03 141.04 235.768 137.699 235.768 137.491Z" fill="#233862"/>
                <path d="M221.717 162.731C223.293 158.86 225.226 155.71 226.351 154.027C223.07 152.248 219.767 150.382 219.458 149.923C218.828 148.99 216.124 135.307 216.124 135.307C216.124 135.307 215.474 133.505 212.59 134.803C212.59 134.803 212.638 151.496 212.951 153.363C213.138 154.481 217.782 159.027 221.717 162.731Z" fill="#FFB27D"/>
                <path d="M258.689 174.806C260.884 175.692 263.305 176.513 265.752 177.14C265.264 173.894 265.76 170.19 266.247 167.593C262.502 165.467 257.719 162.187 253.532 160.075C253.505 160.068 253.477 160.062 253.45 160.057C252.991 159.959 252.537 159.95 252.102 160.015C251.265 160.142 250.423 159.833 249.911 159.163L249.896 159.143C249.896 160.78 246.394 162.195 243.54 162.009C241.135 161.852 240.041 159.782 240.041 158.796C239.777 158.935 239.459 158.923 239.207 158.763C238.596 158.372 237.139 157.708 234.221 157.628C233.49 157.607 232.782 157.379 232.179 156.967C230.971 156.143 228.764 154.691 226.484 153.454C226.485 153.455 226.212 153.836 226.214 153.838C225.089 155.523 222.988 159.015 221.412 162.886C224.048 165.367 226.67 167.319 227.109 167.756C228.203 168.846 228.715 173.265 228.715 173.267C228.715 173.271 228.715 173.278 228.715 173.283C228.677 203.673 224.471 206.443 227.316 208.604C227.335 208.649 227.363 208.668 227.401 208.667C227.401 208.667 230.565 211.534 238.916 211.481C244.168 211.449 248.442 210.867 251.618 210.211C255.891 209.329 258.175 208.31 258.175 208.31C258.273 208.308 258.349 208.076 258.407 207.657C258.67 207.356 258.826 206.96 258.808 206.528C258.787 205.923 258.898 205.156 258.823 204.292C258.704 202.929 258.607 201.603 258.524 200.308C258.394 193.934 257.955 185.513 257.671 181.968C257.534 180.251 257.356 175.663 258.689 174.806Z" fill="white"/>
                <path d="M258.69 174.806C260.884 175.693 263.305 176.513 265.752 177.141C265.63 176.329 265.569 175.489 265.555 174.646C263.01 173.963 259.65 172.837 258.097 171.35C255.418 168.79 251.241 176.363 252.42 183.403C253.598 190.441 252.75 211.152 235.883 211.36C236.808 211.441 237.816 211.486 238.916 211.478C244.169 211.446 248.442 210.864 251.619 210.208C255.891 209.326 258.175 208.307 258.175 208.307C258.273 208.305 258.349 208.073 258.407 207.654C258.67 207.353 258.826 206.957 258.808 206.525C258.788 205.92 258.898 205.153 258.823 204.289C258.704 202.926 258.608 201.6 258.524 200.305C258.394 193.931 257.955 185.51 257.671 181.965C257.534 180.251 257.356 175.664 258.69 174.806Z" fill="#E7E7E7"/>
                <path d="M312.915 104.366H304.303V203.867H312.915V104.366Z" fill="#A2C5F9"/>
                <path d="M308.479 103.47H305.302V207.662H308.479V103.47Z" fill="#C7DCF9"/>
                <path d="M361.182 30.8975H256.037V103.206H361.182V30.8975Z" fill="#CAE0FC"/>
                <path d="M256.037 103.206H361.182V30.8975L256.037 103.206Z" fill="#BBD9F9"/>
                <path d="M284.086 48.4448V85.6576H333.131V48.4448H284.086ZM330.18 82.3584H287.038V51.7456H330.18V82.3584Z" fill="#B64C41"/>
                <path d="M330.18 52.2174V82.3582H287.038V81.8862L284.086 83.915V85.6574H333.131V50.187L330.18 52.2174Z" fill="#AA413E"/>
                <path d="M366.289 104.622H361.183V30.8975L366.289 32.6863V104.622Z" fill="#233862"/>
                <path d="M366.288 104.622H257.833L256.037 103.206H366.288V104.622Z" fill="#233862"/>
                <path d="M325.798 86.4527H280.074C279.256 86.4527 278.593 85.7919 278.593 84.9759C278.593 84.1615 279.256 83.5007 280.074 83.5007H325.798C326.616 83.5007 327.281 84.1615 327.281 84.9759C327.281 85.7919 326.616 86.4527 325.798 86.4527Z" fill="#EE9849"/>
                <path d="M313.324 86.4526V94.683H303.893L300.301 86.4526H313.324Z" fill="#E58638"/>
                <path opacity="0.5" d="M321.053 119.611H285.002L281.409 86.4526H324.647L321.053 119.611Z" fill="#9ED9F0"/>
                <path d="M293.371 115.571C293.257 115.571 293.141 115.528 293.053 115.44C292.878 115.265 292.878 114.982 293.053 114.808L317.711 90.2526C317.886 90.0782 318.17 90.0782 318.345 90.2526C318.521 90.427 318.521 90.7102 318.345 90.8846L293.689 115.44C293.601 115.526 293.485 115.571 293.371 115.571Z" fill="white"/>
                <path d="M286.252 114.789C286.138 114.789 286.022 114.745 285.934 114.657C285.759 114.483 285.759 114.2 285.934 114.025L308.818 91.2365C308.993 91.0621 309.277 91.0621 309.452 91.2365C309.627 91.4109 309.627 91.6941 309.452 91.8685L286.569 114.657C286.482 114.744 286.368 114.789 286.252 114.789Z" fill="white"/>
                <path d="M304.881 113.144C304.766 113.144 304.652 113.101 304.563 113.013C304.388 112.839 304.388 112.555 304.563 112.381L316.453 100.541C316.628 100.367 316.912 100.367 317.087 100.541C317.262 100.715 317.262 100.999 317.087 101.173L305.198 113.013C305.111 113.099 304.996 113.144 304.881 113.144Z" fill="white"/>
                <path d="M311.123 115.336C311.009 115.336 310.893 115.293 310.805 115.205L285.934 90.4366C285.759 90.2622 285.759 89.979 285.934 89.8046C286.109 89.6302 286.393 89.6302 286.569 89.8046L311.44 114.573C311.615 114.747 311.615 115.03 311.44 115.205C311.353 115.293 311.237 115.336 311.123 115.336Z" fill="white"/>
                <path d="M319.949 114.486C319.833 114.486 319.719 114.443 319.63 114.355L300.823 95.6256C300.648 95.4512 300.648 95.168 300.823 94.9936C300.998 94.8192 301.282 94.8192 301.457 94.9936L320.265 113.723C320.44 113.898 320.44 114.181 320.265 114.355C320.178 114.443 320.063 114.486 319.949 114.486Z" fill="white"/>
                <path d="M300.236 114.187C300.122 114.187 300.006 114.144 299.918 114.056L285.934 100.13C285.759 99.9551 285.759 99.6719 285.934 99.4975C286.109 99.3231 286.393 99.3231 286.569 99.4975L300.553 113.424C300.728 113.598 300.728 113.881 300.553 114.056C300.468 114.142 300.352 114.187 300.236 114.187Z" fill="white"/>
                <path d="M319.463 290.734H297.752V211.193C297.752 205.224 302.613 200.384 308.607 200.384C314.602 200.384 319.462 205.224 319.462 211.193V290.734H319.463Z" fill="#1C468A"/>
                <path d="M303.665 209.931C303.665 205.28 307.128 201.437 311.626 200.811C310.669 200.536 309.656 200.385 308.609 200.385C302.614 200.385 297.754 205.225 297.754 211.195V290.736H303.665V209.931Z" fill="#365DA4"/>
                <path d="M430.82 291.306H51.1804C50.888 291.306 50.6502 291.067 50.6502 290.778V290.691C50.6502 290.4 50.8896 290.163 51.1804 290.163H430.82C431.112 290.163 431.35 290.402 431.35 290.691V290.778C431.35 291.067 431.11 291.306 430.82 291.306Z" fill="#13375B"/>
              </svg>

              <h2>Empty here</h2>
              <p>Add new teams to continue</p>
            </div>
            }
        </div>
        <span className={s.cardAmount}><Select onChange={pageSizeHandler} defaultValue={{value: 6, label: 6}} options={cardAmount} menuPlacement="top" styles={style}/></span>
        <div className={s.pages}></div>
    </>
  )
}
