// Testing file for CIEG.sol

// Requiring CIEG
const CIEG = artifacts.require("CIEG");

// Acquiring the dummy accounts provided by the truffle framework for smart contract deployment and testing
contract("CIEG", async (accounts) => {
  // Below section is aimed at inserting data
  describe("Adding Data Section", function () {
    // addVerifiedEmployer is tested
    // Testing block for adding an address to be verified employer address by the contract owner
    // Expectation: Success
    it("Adding Verified Employer from Owner", async () => {
      cieg = await CIEG.deployed();
      let verifiedEmployer = await cieg.addVerifiedEmployer(
        accounts[1],
        "AAA",
        {
          from: accounts[0],
        }
      );
      assert(verifiedEmployer);
    });
    // addVerifiedEmployer is tested
    // Testing block for adding an address to be verified employer address by random address
    // Expectation: Failure
    it("Adding Verified Employer from Not-Owner", async () => {
      cieg = await CIEG.deployed();
      let result;
      try {
        await cieg.addVerifiedEmployer(accounts[1], "AAA", {
          from: accounts[2],
        });
        result = false;
      } catch (err) {
        result = true;
      }
      assert(result);
    });
    // addJob is tested
    // Testing block for adding a job from a verified employer address
    // Expectation: Success
    it("Adding Job by Verified Employer", async () => {
      cieg = await CIEG.deployed();
      let verifiedEmployer = await cieg.addVerifiedEmployer(
        accounts[1],
        "AAA",
        {
          from: accounts[0],
        }
      );
      let jobAdd = await cieg.addJob(0, "ABCD", "EFGH", "IJKL", "MNOP", 1, {
        from: accounts[1],
      });
      assert(jobAdd);
    });
    // addJob is tested
    // Testing block for adding a job from an unverified employer address
    // Expectation: Failure
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
    // addJob is tested
    // Testing block for adding a job from a owner address
    // Expectation: Failure
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
    // addPerfMatrix is tested
    // Testing block for adding performance matrix of a candidate by a verified employer
    // Expectation: Success
    it("Adding Performance Matrix of a Candidate by Verified Employer", async () => {
      cieg = await CIEG.deployed();
      let perfMatrix = await cieg.addPerfMatrix(
        accounts[1],
        accounts[2],
        0,
        4,
        {
          from: accounts[1],
        }
      );
      assert(perfMatrix);
    });
    // addPerfMatrix is tested
    // Testing block for adding performance matrix of a candidate by owner
    // Expectation: Failure
    it("Adding Performance Matrix of a Candidate by Owner", async () => {
      cieg = await CIEG.deployed();
      let result;
      try {
        let perfMatrix = await cieg.addPerfMatrix(
          accounts[1],
          accounts[2],
          0,
          4,
          {
            from: accounts[0],
          }
        );
        result = false;
      } catch (err) {
        result = true;
      }
      assert(result);
    });
    // addPerfMatrix is tested
    // Testing block for adding performance matrix of a candidate by random address
    // Expectation: Failure
    it("Adding Performance Matrix of a Candidate by Random Address", async () => {
      cieg = await CIEG.deployed();
      let result;
      try {
        let perfMatrix = await cieg.addPerfMatrix(
          accounts[1],
          accounts[2],
          0,
          4,
          {
            from: accounts[3],
          }
        );
        result = false;
      } catch (err) {
        result = true;
      }
      assert(result);
    });
    // addCandidate is tested
    // Testing block for adding a candidate for a pre-specified job id from candidate address
    // Expectation: Success
    it("Enrolling Candidate for a Job", async () => {
      cieg = await CIEG.deployed();
      let candidate = await cieg.addCandidate(0, "ABC", 20, "987654", "DEF", {
        from: accounts[2],
      });
      assert(candidate);
    });
    // addCandidate is tested
    // Testing block for adding a candidate for a pre-specified job id from owner address
    // Expectation: Failure
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
  });
  // Below section is aimed at retrieving data
  describe("Retrievals Section", function () {
    // getJob is tested
    // Testing block for retrieving a job for a job id from employer address
    // Expectation: Success
    it("Retrieving a Job", async () => {
      cieg = await CIEG.deployed();
      let verifiedEmployer = await cieg.addVerifiedEmployer(
        accounts[1],
        "AAA",
        {
          from: accounts[0],
        }
      );
      let jobAdd = await cieg.addJob(0, "ABCD", "EFGH", "IJKL", "MNOP", 1, {
        from: accounts[1],
      });
      let jobRetrieval = await cieg.getJob(0, { from: accounts[1] });
      assert(jobRetrieval);
    });
    // getJob is tested
    // Testing block for retrieving a job for an invalid job id from employer address
    // Expectation: Failure
    it("Retrieving an Unknown Job", async () => {
      cieg = await CIEG.deployed();
      let verifiedEmployer = await cieg.addVerifiedEmployer(
        accounts[1],
        "AAA",
        {
          from: accounts[0],
        }
      );
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
    // getJobDetails is tested
    // Testing block for retrieving particular job details for a job id from employer address
    // Expectation: Success
    it("Retrieving Specific Job Details", async () => {
      cieg = await CIEG.deployed();
      let verifiedEmployer = await cieg.addVerifiedEmployer(
        accounts[1],
        "AAA",
        {
          from: accounts[0],
        }
      );
      let jobAdd = await cieg.addJob(0, "ABCD", "EFGH", "IJKL", "MNOP", 1, {
        from: accounts[1],
      });
      let jobRetrieval = await cieg.getJobDetails(0, { from: accounts[1] });
      assert(jobRetrieval);
    });
    // getCandidate is tested
    // Testing block for retrieving a particular candidate for a pre-specified job id from employer address
    // Expectation: Success
    it("Retrieving a particular Candidate", async () => {
      cieg = await CIEG.deployed();
      let candidateRetrieval = await cieg.getCandidate(0, {
        from: accounts[1],
      });
      assert(candidateRetrieval);
    });
    // getVerifiedEmployer is tested
    // Testing block for retrieving a particular employer from owner address
    // Expectation: Success
    it("Retrieving a Verified Employer", async () => {
      cieg = await CIEG.deployed();
      let employerRetrieval = await cieg.getVerifiedEmployer(0, {
        from: accounts[0],
      });
      assert(employerRetrieval);
    });
    // getPerfMatrix is tested
    // Testing block for retrieving a particular performance matrix of candidate from employer address
    // Expectation: Success
    it("Retrieving a Performance Matrix of a Candidate", async () => {
      cieg = await CIEG.deployed();
      let perfMatrixRetrieval = await cieg.getPerfMatrix(0, {
        from: accounts[1],
      });
      assert(perfMatrixRetrieval);
    });
  });
});
