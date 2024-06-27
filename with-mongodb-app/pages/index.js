import Link from 'next/link'
import useSWR from 'swr';
import clientPromise from '../lib/mongodb'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home({ isConnected }) {
  const {data} = useSWR('/api/user', fetcher);
  console.log(data?.user);

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">
        {/* {user ? user.name : "stranger"} 님 반갑습니다.  */}
      </h1>
      <div className="col-lg-7 mx-auto">
        <p className="lead mt-4 mb-4">
          NextJS와 MongoDB를 이용한 로그인 세션 구현 샘플입니다.
          <br />
          계정이 있으시면 아래 로그인 버튼을 누르시고, 
          <br />
          없으시면 가입하기 버튼을 눌러 계정을 만드십시요.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" className="btn btn-primary px-4 gap-3">
            <Link href="/login">로그인</Link>
          </button>
          <button type="button" className="btn btn-outline-secondary px-4">
            <Link href="/signup">가입하기</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the folloing code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
