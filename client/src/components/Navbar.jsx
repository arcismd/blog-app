import React from 'react'
import { Link, NavLink } from "react-router-dom"

export const Navbar = () => {

  const isAuth = false

  const activeLink = {
    color: 'white',
  }

  return (
    <div className='flex py-4 justify-between items-center'>
      <span className='flex justify-center items-center 2-6 h-6 bg-gray-600 text-sx text-white rounded-sm'></span>
      {
        isAuth && (
          <ul className='flex gap-8'>
          <li>
            <NavLink
            to={'/'}
            href='/'
            className='text-sx text-gray-400 hover:text-white'
            style={({isActive}) => isActive ? activeLink : undefined}
            >
              Pagina principala
            </NavLink>
          </li>
          <li>
          <NavLink
            to={'/posts'}
            href='/'
            className='text-sx text-gray-400 hover:text-white'
            style={({isActive}) => isActive ? activeLink : undefined}
            >
              Postarile mele
            </NavLink>
          </li>
          <li>
          <NavLink
            to={'/new'}
            href='/'
            className='text-sx text-gray-400 hover:text-white'
            style={({isActive}) => isActive ? activeLink : undefined}
            >
              Adauga postare
            </NavLink>
          </li>
        </ul>
        )
      }

      <div className='flex-justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
        {
          isAuth ? (
            <button>Iesi</button>
          ) : (
            <Link to={'/login'}>Intra</Link>
          )
        }
      </div>  
    </div>
  )
}
