import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import SideNav from '../components/SideNav';

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Header open={open}> </Header>
      <SideNav open={open} setOpen={setOpen}></SideNav>
      <Main open={open}></Main>
    </>
  );
}
export default Dashboard;
