/**************************************************
 * Create graphics with textarea data
 **************************************************/
  // raw CSV data from textarea.
  Data = PlottingPointSource.value.split('\n');

  // +2 to skip the header and the empty line at the bottom.
  while(Data.length > (i + 2))
  {
      Line = Data[i+1].split(",");

      identifier[i] = Line[0];
      pLatitude[i] = Line[1];
      pLongitude[i] = Line[2];
      account[i] = Line[3];
      region[i] = Line[4];
      company[i] = Line[5];
      site[i] = Line[6];
      reportingyear[i] = Line[7];
      county[i] = Line[8];
      sic[i] = Line[9];
      sicdescription[i] = Line[10];

      // Pops value from the end, in order from last variable, and parses as a Float.
      voctpy[i] = parseFloat(Line.pop());
      so2tpy[i] = parseFloat(Line.pop());
      pm25tpy[i] = parseFloat(Line.pop());
      pm10tpy[i] = parseFloat(Line.pop());
      pbtpy[i] = parseFloat(Line.pop());
      noxtpy[i] = parseFloat(Line.pop());
      cotpy[i] = parseFloat(Line.pop());

      // Assigns new 'Max' value when TRUE.
      if(voctpy[vocMax] < voctpy[i])
        {vocMax = i;}
      if(so2tpy[so2Max] < so2tpy[i])
        {so2Max = i;}
      if(pm25tpy[pm25Max] < pm25tpy[i])
        {pm25Max = i;}
      if(pm10tpy[pm10Max] < pm10tpy[i])
        {pm10Max = i;}
      if(pbtpy[pbMax] < pbtpy[i])
        {pbMax = i;}
      if(noxtpy[noxMax] < noxtpy[i])
        {noxMax = i;}
      if(cotpy[coMax] < cotpy[i])
        {coMax = i;}

      psPoint[i] =
      {
      geometry: new Point({
        x: pLongitude[i],
        y: pLatitude[i],
        spatialReference: 4326
      }),
      // select only the attributes you care about
      attributes: {
        title: site[i],
        ObjectID: parseInt(i),
        cotpy: cotpy[i],
        noxtpy: noxtpy[i],
        pbtpy: pbtpy[i],
        pm10tpy: pm10tpy[i],
        pm25tpy: pm25tpy[i],
        so2tpy: so2tpy[i],
        voctpy: voctpy[i],
        company: company[i],
        identifier: identifier[i],
        sic: sic[i],
        sicdescription: sicdescription[i],
        region: region[i],
        reportingyear: reportingyear[i]
      }
    };
    i++;
  }
  if(Data.length = (i + 2))
  {
    createPSlayer()
  }
