const CIEG = artifacts.require("CIEG");

contract("CIEG", async (accounts) => {
  it("Adding Verified Employer from Owner", async () => {
    cieg = await CIEG.deployed();
    let verifiedEmployer = await cieg.addVerifiedEmployer(accounts[1], "AAA", {
      from: accounts[0],
    });
    assert(verifiedEmployer);
  });
  it("Adding Verified Employer from Not-Owner", async () => {
    cieg = await CIEG.deployed();
    let result;
    try {
      await cieg.addVerifiedEmployer(accounts[1], "AAA", { from: accounts[2] });
      result = false;
    } catch (err) {
      result = true;
    }
    assert(result);
  });
  it("Adding Job by Verified Employer", async () => {
    cieg = await CIEG.deployed();
    let verifiedEmployer = await cieg.addVerifiedEmployer(accounts[1], "AAA", {
      from: accounts[0],
    });
    let jobAdd = await cieg.addJob(0, "ABCD", "EFGH", "IJKL", "MNOP", 1, {
      from: accounts[1],
    });
    assert(jobAdd);
  });
  it("Adding Job by Not-Verified Employer", async () => {
    cieg = await CIEG.deployed();
    let result;
    try {
      await cieg.addJob(0, "ABCD", "EFGH", "IJKL", "MNOP", 1, {
        from: accounts[2],
      });
      result = false;
    } catch (err) {
      result = true;
    }
    assert(result);
  });
  it("Adding Job by Owner", async () => {
    cieg = await CIEG.deployed();
    let result;
    try {
      await cieg.addJob(0, "ABCD", "EFGH", "IJKL", "MNOP", 1, {
        from: accounts[0],
      });
      result = false;
    } catch (err) {
      result = true;
    }
    assert(result);
  });
  it("Adding Performance Matrix of a Candidate", async () => {
    cieg = await CIEG.deployed();
    let perfMatrix = await cieg.addPerfMatrix(accounts[1], accounts[2], 0, 4, {
      from: accounts[0],
    });
    assert(perfMatrix);
  });
  it("Enrolling Candidate for a Job", async () => {
    cieg = await CIEG.deployed();
    let candidate = await cieg.addCandidate(0, "ABC", 20, "987654", "DEF", {
      from: accounts[2],
    });
    assert(candidate);
  });
  it("Enrolling Candidate for a Job by Owner", async () => {
    cieg = await CIEG.deployed();
    let result;
    try {
      let candidate = await cieg.addCandidate(0, "ABC", 20, "987654", "DEF", {
        from: accounts[0],
      });
      result = false;
    } catch (err) {
      result = true;
    }
    assert(result);
  });
  it("Retrieving a Job", async () => {
    cieg = await CIEG.deployed();
    let verifiedEmployer = await cieg.addVerifiedEmployer(accounts[1], "AAA", {
      from: accounts[0],
    });
    let jobAdd = await cieg.addJob(0, "ABCD", "EFGH", "IJKL", "MNOP", 1, {
      from: accounts[1],
    });
    let jobRetrieval = await cieg.getJob(0, { from: accounts[1] });
    assert(jobRetrieval);
  });
  it("Retrieving an Unknown Job", async () => {
    cieg = await CIEG.deployed();
    let verifiedEmployer = await cieg.addVerifiedEmployer(accounts[1], "AAA", {
      from: accounts[0],
    });
    let jobAdd = await cieg.addJob(0, "ABCD", "EFGH", "IJKL", "MNOP", 1, {
      from: accounts[1],
    });
    let result;
    try {
      let jobRetrieval = await cieg.getJob(-250, { from: accounts[1] });
      result = false;
    } catch (err) {
      result = true;
    }
    assert(result);
  });
  it("Retrieving Specific Job Details", async () => {
    cieg = await CIEG.deployed();
    let verifiedEmployer = await cieg.addVerifiedEmployer(accounts[1], "AAA", {
      from: accounts[0],
    });
    let jobAdd = await cieg.addJob(0, "ABCD", "EFGH", "IJKL", "MNOP", 1, {
      from: accounts[1],
    });
    let jobRetrieval = await cieg.getJobDetails(0, { from: accounts[1] });
    assert(jobRetrieval);
  });
  it("Retrieving a particular Candidate", async () => {
    cieg = await CIEG.deployed();
    let candidateRetrieval = await cieg.getCandidate(0, { from: accounts[1] });
    assert(candidateRetrieval);
  });
  it("Retrieving a Verified Employer", async () => {
    cieg = await CIEG.deployed();
    let employerRetrieval = await cieg.getVerifiedEmployer(0, {
      from: accounts[1],
    });
    assert(employerRetrieval);
  });
  it("Retrieving a Performance Matrix of a Candidate", async () => {
    cieg = await CIEG.deployed();
    let perfMatrixRetrieval = await cieg.getPerfMatrix(0, {
      from: accounts[1],
    });
    assert(perfMatrixRetrieval);
  });
});
