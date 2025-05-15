import Head from 'next/head'

const PageHead = ({ headTitle }) => {
    return (
        <>
            <Head>
                <title>
                    {headTitle ? headTitle : "Name - Twitter24"}
                </title>
            </Head>
        </>
    )
}

export default PageHead