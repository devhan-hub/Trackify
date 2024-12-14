import { CalendarMonth, Dashboard, EventAvailable, FormatListBulleted, PriorityHigh } from '@mui/icons-material';
import React, { Suspense } from 'react';
import { Search,SearchDisplay } from './SearchMain';
import Update from '../allCatagory/Update'

export const LazyDashbored = React.lazy(() => import('../Dashbored'));
export const LazyMain = React.lazy(() => import('../Main'));
export const LazyPlanned = React.lazy(() => import('../Planned'));

const Navigation = (allGroup, path) => {
    const [filteredTasks, setFilteredTasks] = React.useState(null)

    const NAVIGATION = [
        {
            kind: 'header',
            title: 'Search',
        },
      
        {   
             segment:'search',
             title:'',
            action:<Search  setFilteredTasks={setFilteredTasks}/>,
            component:<SearchDisplay filteredTasks={filteredTasks} />

        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Main items',
        },
        {
            segment: 'dashboard',
            title: 'Dashboard',
            icon: <Dashboard />,
            component: (<Suspense fallback={<div>Loading Dashbored</div>}>
                <LazyDashbored />
            </Suspense>),
        },
        {
            segment: 'vitalTask',
            title: 'VitalTask',
            icon: <PriorityHigh />,
            component: (<Suspense fallback={<div>Loading ....</div>}>
                <LazyMain group={'vitalTask'} name={'VitalTask'} />
            </Suspense>)
        },
        {
            segment: 'myday',
            title: 'Myday',
            icon: <EventAvailable />,
            component: (<Suspense fallback={<div>Loading ....</div>}>

                <LazyMain group={'myday'} name={'MyDay'} />
            </Suspense>),
        },
        {
            segment: 'planned',
            title: 'Planned',
            icon: <CalendarMonth />,
            component: (<Suspense fallback={<div>Loading Planned</div>}>
                <LazyPlanned />
            </Suspense>),
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Category',
        },
        ...(allGroup?.map((group) => ({
            segment: group.id,
            title: group.name,
            icon: <FormatListBulleted />,
            action: path === group.id ? (
             <Update name={group.name} id={group.id} />
            ) : null,
             component: (<Suspense fallback={<div>Loading ....</div>}>

                <LazyMain group={group.id} name={group.name} />
            </Suspense>),
        })) || []),
    ];



    return NAVIGATION;
}

export default Navigation
