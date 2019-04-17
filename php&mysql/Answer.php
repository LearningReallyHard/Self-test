(6)
SELECT CASE WHEN investments.name IS NULL THEN NULL
        ELSE investments.name END,
        COUNT(DISTINCT companies.link)
      FROM A companies
      LEFT JOIN B investments
      ON companes.name = investments.name
      GROUP BY 1
      ORDER BY 2 DESC
