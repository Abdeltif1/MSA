import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return(
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/admin/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Admin Page
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Prayers View</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/imam-management" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Imam Management</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/iqama-management" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Iqama Management</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">To be added</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">Information</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            {/* Footer text area */}

          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
    );
}