import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getSession({ req });

  const queryParamString = new URLSearchParams({
    limit: "4",
    before: Date.now().toString()
  });

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?" +
      queryParamString.toString(),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`
      }
    }
  );

  const data = await response.json();

  res.status(200).json(JSON.stringify(data, null, 2));
}
