import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomDrawer from '../drawer'

const HomeLayout = ({children}) => {
    return(
        <React.Fragment>
        <div style={{backgroundColor: '#eee'}} >
            <CustomDrawer>
                <Outlet>
                    {children}
                </Outlet>
            </CustomDrawer>
        </div>
        </React.Fragment>
    )
}
export default HomeLayout
