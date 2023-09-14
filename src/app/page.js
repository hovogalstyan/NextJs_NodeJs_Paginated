'use client';

import {useDispatch, useSelector} from "react-redux";
import ReactPaginate from "react-paginate";
import {useCallback, useEffect, useMemo, useState} from "react";
import {getPhotosPaginated} from "@/store/action";
import {useRouter, useSearchParams} from "next/navigation";

export default function Home() {
    const photosData = useSelector(state => state.photos.data);
    const [activePage, setActivePage] = useState(null)
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const getQuery = searchParams.get('page')
    const router = useRouter();


    useEffect(() => {
        if (getQuery) {
            setActivePage(getQuery)
            dispatch(getPhotosPaginated({page: getQuery, limit: 9}))
        } else {
            dispatch(getPhotosPaginated({page: 1, limit: 9}))
            router.push(`/?page=${1}`)
            setActivePage(1)
        }
    }, [getQuery, dispatch, router, activePage]);

    const pageCounts = useMemo(() => {
        return photosData.total_Page ? photosData.total_Page : 0
    }, [photosData]);

    const handleChangePage = useCallback((value) => {
        router.push(`/?page=${value}`)
    }, [router]);
    const activeClassPages = useMemo(() => {
        return getQuery && activePage && getQuery === activePage ? 'active' : ''
    }, [getQuery, activePage])
    return (
        <main className={'home'}>
            <div className={'photos_row'}>
                {
                    photosData.results && photosData.results.map(item => (
                        <figure key={item.id}>
                            <img src={item.url} alt={item.title}/>
                        </figure>
                    ))
                }
            </div>
            <div className={'paginated_container'}>
                <ReactPaginate
                    nextLabel={'>>'}
                    onPageChange={(e) => handleChangePage(e.selected + 1)}
                    previousLabel={'<<'}
                    pageRangeDisplayed={3}
                    activeClassName={activeClassPages}
                    pageCount={pageCounts}
                />
            </div>
        </main>
    )
}
