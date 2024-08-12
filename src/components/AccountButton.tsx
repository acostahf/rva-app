import { Link } from "expo-router";

const AccountButton = () => {
  return (
    <Link
      href="/account"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
      Account
    </Link>
  );
}

export default AccountButton;