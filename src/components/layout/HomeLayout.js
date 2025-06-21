import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomDrawer from '../drawer'
import Footer from '../footer'

const HomeLayout = ({children}) => {
    return(
        <React.Fragment>
        <div style={{backgroundColor: '#eee', minHeight: '100vh', display: 'flex', flexDirection: 'column'}} >
            <CustomDrawer>
                <Outlet>
                    {children}
                </Outlet>
            </CustomDrawer>
            <Footer />
        </div>
        </React.Fragment>
    )
}
export default HomeLayout
