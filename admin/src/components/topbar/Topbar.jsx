import React from 'react';
import './topbar.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { MdOutlineLightMode } from 'react-icons/md';
import { SiDarkreader } from 'react-icons/si';
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext } from 'react';
export default function Topbar() {
	const { toggle, darkMode } = useContext(DarkModeContext);
	return (
		<div className='topbar'>
			<div className='topbarWrapper'>
				<div className='topLeft'>
					<span className='logo'>PMEADMIN</span>
				</div>
				<div className='topRight'>
					<div className='topbarIconContainer'>
						{darkMode ? (
							<SiDarkreader
								className='CiDark'
								onClick={toggle}
							/>
						) : (
							<MdOutlineLightMode
								className='CiDark'
								onClick={toggle}
							/>
						)}
					</div>
					<div className='topbarIconContainer'>
						<NotificationsNone />
						<span className='topIconBadge'>2</span>
					</div>
					<div className='topbarIconContainer'>
						<Language />
						<span className='topIconBadge'>2</span>
					</div>
					<div className='topbarIconContainer'>
						<Settings />
					</div>
					<img
						src='https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
						alt=''
						className='topAvatar'
					/>
				</div>
			</div>
		</div>
	);
}
