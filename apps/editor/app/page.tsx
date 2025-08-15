import { getUser } from "@/actions/users";

export default async function Page() {
    const user = await getUser({ filter: ['email', 'admin@neotree.org'], });

    return (
        <div>
            <pre>{!user ? null : JSON.stringify(user, null, 4)}</pre>
        </div>
    );
}
